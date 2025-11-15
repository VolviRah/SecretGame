
if (typeof gdjs.evtsExt__HedgehogPlatformer__DefineHelperClasses !== "undefined") {
  gdjs.evtsExt__HedgehogPlatformer__DefineHelperClasses.registeredGdjsCallbacks.forEach(callback =>
    gdjs._unregisterCallback(callback)
  );
}

gdjs.evtsExt__HedgehogPlatformer__DefineHelperClasses = {};
gdjs.evtsExt__HedgehogPlatformer__DefineHelperClasses.idToCallbackMap = new Map();


gdjs.evtsExt__HedgehogPlatformer__DefineHelperClasses.userFunc0xa83340 = function GDJSInlineCode(runtimeScene, eventsFunctionContext) {
"use strict";
if (gdjs.__hedgehogPlatformerExtension) {
    return;
}

/**
 * Get the platforms manager of an instance container.
 * 
 * @param {gdjs.RuntimeInstanceContainer} instanceContainer
 */
function getManager(instanceContainer) {
    if (!instanceContainer.hedgehogPlatformsObjectsManager) {
        //Create the shared manager if necessary.
        instanceContainer.hedgehogPlatformsObjectsManager = new PlatformObjectsManager(
            instanceContainer
        );
    }
    return instanceContainer.hedgehogPlatformsObjectsManager;
}

/**
 * Manages the common objects shared by objects having a
 * platform behavior: in particular, the platforms behaviors are required to
 * declare themselves (see PlatformObjectsManager.addPlatform) to the manager
 * of their associated container (see PlatformRuntimeBehavior.getManager).
 */
class PlatformObjectsManager {
    _collisionLayerRBushes;
    /** Platforms near the object, updated with `_updatePotentialCollidingObjects`.
     * @type {Array<PlatformRuntimeBehavior>}
     */
    _potentialCollidingObjects = [];
    lastRaycastResult = new RaycastResult();
    /**
     * @type {PlatformRuntimeBehavior | null}
     */
    lastOverlappingPlatform = null;

    /**
     * @param {gdjs.RuntimeInstanceContainer} instanceContainer
     */
    constructor(instanceContainer) {
        this._collisionLayerRBushes = [];
    }

    /**
     * Add a platform to the list of existing platforms.
     * 
     * @param {PlatformRuntimeBehavior} platformBehavior
     */
    addPlatform(platformBehavior) {
        if (platformBehavior.currentRBushAABB) {
            platformBehavior.currentRBushAABB.updateAABBFromOwner();
        }
        else {
            platformBehavior.currentRBushAABB = new gdjs.BehaviorRBushAABB(
                platformBehavior
            );
        }
        const collisionLayerIndex = platformBehavior.behavior._getCollisionLayer();
        let collisionLayerRBush = this._collisionLayerRBushes[collisionLayerIndex];
        if (!collisionLayerRBush) {
            collisionLayerRBush = new rbush();
            this._collisionLayerRBushes[collisionLayerIndex] = collisionLayerRBush;
        }
        collisionLayerRBush.insert(platformBehavior.currentRBushAABB);

        if (platformBehavior.behavior.IsLayerToggleMarker()) {
            const collisionLayerIndex = platformBehavior.behavior._getTargetedCollisionLayer();
            let collisionLayerRBush = this._collisionLayerRBushes[collisionLayerIndex];
            if (!collisionLayerRBush) {
                collisionLayerRBush = new rbush();
                this._collisionLayerRBushes[collisionLayerIndex] = collisionLayerRBush;
            }
            collisionLayerRBush.insert(platformBehavior.currentRBushAABB);
        }
    }

    /**
     * Remove a platform from the list of existing platforms. Be sure that the platform was
     * added before.
     * 
     * @param {PlatformRuntimeBehavior} platformBehavior
     */
    removePlatform(platformBehavior) {
        const collisionLayerIndex = platformBehavior.behavior._getCollisionLayer();
        const collisionLayerRBush = this._collisionLayerRBushes[collisionLayerIndex];
        if (!collisionLayerRBush) {
            return;
        }
        collisionLayerRBush.remove(platformBehavior.currentRBushAABB);

        if (platformBehavior.behavior.IsLayerToggleMarker()) {
            const collisionLayerIndex = platformBehavior.behavior._getTargetedCollisionLayer();
            const collisionLayerRBush = this._collisionLayerRBushes[collisionLayerIndex];
            if (!collisionLayerRBush) {
                return;
            }
            collisionLayerRBush.remove(platformBehavior.currentRBushAABB);
        }
    }

    /**
     * Returns all the platforms around the specified object.
     * 
     * @param {gdjs.RuntimeObject} object
     * @param {number} collisionLayerIndex
     * @param {number} maxMovementLength The maximum distance, in pixels, the object is going to do.
     */
    updatePotentialCollidingObjects(
        object,
        maxMovementLength,
        collisionLayerIndex
    ) {
        this.getAllPlatformsAround(
            object,
            maxMovementLength,
            collisionLayerIndex,
            this._potentialCollidingObjects
        );

        // Filter the potential colliding platforms to ensure that the object owning the behavior
        // is not considered as colliding with itself, in the case that it also has the
        // platform behavior.
        for (let i = 0; i < this._potentialCollidingObjects.length;) {
            if (this._potentialCollidingObjects[i].owner === object) {
                this._potentialCollidingObjects.splice(i, 1);
            } else {
                i++;
            }
        }
    }

    /**
     * Returns all the platforms around the specified object.
     * 
     * @param {gdjs.RuntimeObject} object
     * @param {number} maxMovementLength The maximum distance, in pixels, the object is going to do.
     * @param {number} collisionLayerIndex
     * @param {gdjs.RuntimeBehavior[]} result An array with all platforms near the object.
     */
    getAllPlatformsAround(
        object,
        maxMovementLength,
        collisionLayerIndex,
        result
    ) {
        // TODO: This would better be done using the object AABB (getAABB), as (`getCenterX`;`getCenterY`) point
        // is not necessarily in the middle of the object (for sprites for example).
        const ow = object.getWidth();
        const oh = object.getHeight();
        const x = object.getDrawableX() + object.getCenterX();
        const y = object.getDrawableY() + object.getCenterY();
        /** @type {SearchArea} */
        const searchArea = gdjs.staticObject(
            PlatformObjectsManager.prototype.getAllPlatformsAround
        );
        searchArea.minX = x - ow / 2 - maxMovementLength;
        searchArea.minY = y - oh / 2 - maxMovementLength;
        searchArea.maxX = x + ow / 2 + maxMovementLength;
        searchArea.maxY = y + oh / 2 + maxMovementLength;

        result.length = 0;

        const collisionLayerRBush = this._collisionLayerRBushes[collisionLayerIndex];
        if (!collisionLayerRBush) {
            return;
        }
        /** @type {gdjs.BehaviorRBushAABB<gdjs.RuntimeBehavior>[]} */
        const nearbyPlatforms = collisionLayerRBush.search(searchArea);

        // Extra check on the platform owner AABB
        // TODO: PR https://github.com/4ian/GDevelop/pull/2602 should remove the need
        // for this extra check once merged.
        for (let i = 0; i < nearbyPlatforms.length; i++) {
            const platform = nearbyPlatforms[i].behavior;
            const platformAABB = platform.owner.getAABB();
            const platformIsStillAround =
                platformAABB.min[0] <= searchArea.maxX &&
                platformAABB.min[1] <= searchArea.maxY &&
                platformAABB.max[0] >= searchArea.minX &&
                platformAABB.max[1] >= searchArea.minY;
            // Filter platforms that are not in the searched area anymore.
            // This can happen because platforms are not updated in the RBush before that
            // characters movement are being processed.
            if (platformIsStillAround) {
                result.push(platform);
            }
        }
    }

    /**
     * @param {number} x
     * @param {number} y
     * @param {boolean} shouldIgnoreJumpthru
     * @param {PlatformRuntimeBehavior | null} overlappingJumpthru
     */
    isInsidePotentialCollidingObjects(x, y,
        shouldIgnoreJumpthru,
        overlappingJumpthru) {
        for (const platformBehavior of this._potentialCollidingObjects) {
            if (!platformBehavior.behavior.IsSolid()
                || (shouldIgnoreJumpthru && platformBehavior.behavior.IsJumpthru())
                || platformBehavior === overlappingJumpthru) {
                continue;
            }
            const object = platformBehavior.owner;
            if (object.isCollidingWithPoint(x, y)) {
                return true;
            }
        }
        return false;
    }

    /**
     * @param {number} sourceX
     * @param {number} sourceY
     * @param {number} targetX
     * @param {number} targetY
     * @param {boolean} shouldIgnoreJumpthru
     * @param {PlatformRuntimeBehavior | null} overlappingJumpthru
     */
    raycastBothWayPotentialCollidingObjects(
        sourceX,
        sourceY,
        targetX,
        targetY,
        shouldIgnoreJumpthru,
        overlappingJumpthru
    ) {
        let rayX = targetX - sourceX;
        let rayY = targetY - sourceY;
        const rayLength = Math.hypot(rayX, rayY);
        let halfUnitX = rayX / (2 * rayLength);
        let halfUnitY = rayY / (2 * rayLength);
        if (this.isInsidePotentialCollidingObjects(
            sourceX - halfUnitX,
            sourceY - halfUnitY,
            shouldIgnoreJumpthru,
            overlappingJumpthru)) {
            // Cast the other way
            rayX = -rayX;
            rayY = -rayY;
            halfUnitX = -halfUnitX;
            halfUnitY = -halfUnitY;
            let stepSourceX = sourceX;
            let stepSourceY = sourceY;
            let stepTargetX = sourceX + rayX;
            let stepTargetY = sourceY + rayY;
            let iteration = 0;
            do {
                const isIntersectionFound = this.raycastPotentialCollidingObjects(
                    stepSourceX,
                    stepSourceY,
                    stepTargetX,
                    stepTargetY,
                    shouldIgnoreJumpthru,
                    overlappingJumpthru
                );
                if (!isIntersectionFound) {
                    return false;
                }
                stepSourceX = this.lastRaycastResult.intersectionX + halfUnitX;
                stepSourceY = this.lastRaycastResult.intersectionY + halfUnitY;
                iteration++;
            }
            // It needs to loop as the intersection may be on an inner edge.
            while (iteration < 100
            && this.isInsidePotentialCollidingObjects(stepSourceX, stepSourceY)
            // Ensure the source doesn't go passed the target.
            && Math.sign(rayX) === Math.sign(stepTargetX - stepSourceX)
                && Math.sign(rayY) === Math.sign(stepTargetY - stepSourceY));
            // Replace the last raycast step distance with the whole distance.
            this.lastRaycastResult.distance = -Math.hypot(
                this.lastRaycastResult.intersectionX - sourceX,
                this.lastRaycastResult.intersectionY - sourceY
            );
            this.lastRaycastResult.normalX = -this.lastRaycastResult.normalX;
            this.lastRaycastResult.normalY = -this.lastRaycastResult.normalY;
            return true;
        }
        else {
            // Go back a bit to be sure not to miss a close edge.
            const hasIntersected = this.raycastPotentialCollidingObjects(
                sourceX - halfUnitX,
                sourceY - halfUnitY,
                targetX,
                targetY,
                shouldIgnoreJumpthru,
                overlappingJumpthru
            );
            if (this.lastRaycastResult.platform) {
                this.lastRaycastResult.distance -= 0.5;
            }
            return hasIntersected;
        }
    }

    /**
     * @param {number} sourceX
     * @param {number} sourceY
     * @param {number} targetX
     * @param {number} targetY
     * @param {boolean} shouldIgnoreJumpthru
     * @param {PlatformRuntimeBehavior | null} overlappingJumpthru
     */
    raycastPotentialCollidingObjects(
        sourceX,
        sourceY,
        targetX,
        targetY,
        shouldIgnoreJumpthru,
        overlappingJumpthru,
    ) {
        this.lastRaycastResult.clear();
        const rayX = targetX - sourceX;
        const rayY = targetY - sourceY;
        let sqDistMin = rayX * rayX + rayY * rayY;
        for (const platformBehavior of this._potentialCollidingObjects) {
            if (!platformBehavior.behavior.IsSolid()
                || (shouldIgnoreJumpthru && platformBehavior.behavior.IsJumpthru())
                || platformBehavior === overlappingJumpthru) {
                continue;
            }
            const object = platformBehavior.owner;
            const result = object.raycastTest(sourceX, sourceY, targetX, targetY, true);
            if (result.collision && result.closeSqDist <= sqDistMin) {
                sqDistMin = result.closeSqDist;
                this.lastRaycastResult.platform = platformBehavior;
                this.lastRaycastResult.intersectionX = result.closeX;
                this.lastRaycastResult.intersectionY = result.closeY;
                this.lastRaycastResult.normalX = result.edgeY;
                this.lastRaycastResult.normalY = -result.edgeX;
            }
        }
        if (!this.lastRaycastResult.platform) {
            return false;
        }
        this.lastRaycastResult.distance = Math.sqrt(sqDistMin);
        this.lastRaycastResult.nomalizeAccordingTo(rayX, rayY);
        return true;
    }

    /**
     * @param {gdjs.RuntimeObject} object
     * @param {string} platformType
     */
    isOverlappingPotentialCollidingObjects(object, platformType) {
        this.lastOverlappingPlatform = null;
        for (const platformBehavior of this._potentialCollidingObjects) {
            if (platformBehavior.behavior._getPlatformType() !== platformType) {
                continue;
            }
            const platform = platformBehavior.owner;
            if (gdjs.RuntimeObject.collisionTest(
                object,
                platform,
                false,
                true
            )) {
                this.lastOverlappingPlatform = platformBehavior;
                return true;
            }
        }
        return false;
    }
}

class RaycastResult {
    /** @type {PlatformRuntimeBehavior | null} */
    platform = null;
    distance = 0;
    intersectionX = 0;
    intersectionY = 0;
    normalX = 0;
    normalY = 0;

    clear() {
        this.platform = null;
        this.distance = 0;
        this.intersectionX = 0;
        this.intersectionY = 0;
        this.normalX = 0;
        this.normalY = 0;
    }

    /**
     * @param {number} rayX
     * @param {number} rayY
     */
    nomalizeAccordingTo(rayX, rayY) {
        const normalLength = Math.hypot(this.normalX, this.normalY);
        this.normalX /= normalLength;
        this.normalY /= normalLength;

        const dotProduct = rayX * this.normalX + rayY * this.normalY;
        if (dotProduct > 0) {
            this.normalX = -this.normalX;
            this.normalY = -this.normalY;
        }
    }
}


/**
 * PlatformRuntimeBehavior represents a behavior allowing objects to be
 * considered as a platform by objects having PlatformerObject Behavior.
 */
class PlatformRuntimeBehavior {
    //Note that we can't use getX(), getWidth()... of owner here: The owner is not fully constructed.
    _oldX = 0;
    _oldY = 0;
    _oldWidth = 0;
    _oldHeight = 0;
    _oldAngle = 0;
    /** @type {gdjs.BehaviorRBushAABB<PlatformRuntimeBehavior> | null} */
    currentRBushAABB = null;
    /** @type {PlatformObjectsManager} */
    _manager;
    _registeredInManager = false;
    /** @type {gdjs.RuntimeObject} */
    owner;
    /** @type {gdjs.RuntimeBehavior} */
    behavior;

    /**
     * @param instanceContainer {gdjs.RuntimeInstanceContainer}
     * @param behavior {gdjs.RuntimeBehavior}
     */
    constructor(
        instanceContainer,
        behavior,
    ) {
        this.behavior = behavior;
        this.owner = behavior.owner;
        this._manager = getManager(instanceContainer);
    }

    onDestroy() {
        if (this._manager && this._registeredInManager) {
            this._manager.removePlatform(this);
        }
    }

    doStepPreEvents() {
        //Scene change is not supported
        /*if ( parentScene != &scene ) //Parent scene has changed
              {
                  if ( sceneManager ) //Remove the object from any old scene manager.
                      sceneManager->RemovePlatform(this);
                  parentScene = &scene;
                  sceneManager = parentScene ? &ScenePlatformObjectsManager::managers[&scene] : NULL;
                  registeredInManager = false;
              }*/

        //Make sure the platform is or is not in the platforms manager.
        if (!this.behavior.activated() && this._registeredInManager) {
            this._manager.removePlatform(this);
            this._registeredInManager = false;
        } else {
            if (this.behavior.activated() && !this._registeredInManager) {
                this._manager.addPlatform(this);
                this._registeredInManager = true;
            }
        }

        //Track changes in size or position
        if (
            this._oldX !== this.owner.getX() ||
            this._oldY !== this.owner.getY() ||
            this._oldWidth !== this.owner.getWidth() ||
            this._oldHeight !== this.owner.getHeight() ||
            this._oldAngle !== this.owner.getAngle()
        ) {
            if (this._registeredInManager) {
                this._manager.removePlatform(this);
                this._manager.addPlatform(this);
            }
            this._oldX = this.owner.getX();
            this._oldY = this.owner.getY();
            this._oldWidth = this.owner.getWidth();
            this._oldHeight = this.owner.getHeight();
            this._oldAngle = this.owner.getAngle();
        }
    }

    onActivate() {
        if (this._registeredInManager) {
            return;
        }
        this._manager.addPlatform(this);
        this._registeredInManager = true;
    }

    onDeActivate() {
        if (!this._registeredInManager) {
            return;
        }
        this._manager.removePlatform(this);
        this._registeredInManager = false;
    }
}

/**
 * PlatformRuntimeBehavior represents a behavior allowing objects to be
 * considered as a platform by objects having PlatformerObject Behavior.
 */
class PlatformerCharacterRuntimeBehavior {
    /** @type {Array<[number, { width: number, height: number, bottomWidth: number }} */
    dimensionsByAnimationIndex = [];
    tempDimension = { width: 0, height: 0, bottomWidth: 0 };
    /** @type {gdjs.RuntimeBehavior} */
    behavior;

    /**
     * @param behavior {gdjs.RuntimeBehavior}
     */
    constructor(behavior) {
        this.behavior = behavior;
    }

    getHitBoxesAABB() {
        const object = this.behavior.owner;
        const animationIndex = object instanceof gdjs.SpriteRuntimeObject ? object.getAnimationIndex() : 0;
        const scaleX = object.getScaleX ? object.getScaleX() : 1;
        const scaleY = object.getScaleY ? object.getScaleY() : 1;
        const dimension = this.dimensionsByAnimationIndex[animationIndex];
        if (dimension) {
            this.tempDimension.width = dimension.width * scaleX;
            this.tempDimension.height = dimension.height * scaleY;
            this.tempDimension.bottomWidth = dimension.bottomWidth * scaleX;
            return this.tempDimension;
        }
        else {
            // The object needs to be rotated back to 0 to get the hit-boxes AABB.
            // This is very costly because the hit-boxes vertexes are transformed.
            const angle = object.getAngle();
            object.setAngle(0);

            let ownerMinX = Number.MAX_VALUE;
            let ownerMaxX = -Number.MAX_VALUE;
            let ownerMinY = Number.MAX_VALUE;
            let ownerMaxY = -Number.MAX_VALUE;
            const hitBoxes = object.getHitBoxes();
            for (const hitBox of hitBoxes) {
                for (const vertex of hitBox.vertices) {
                    ownerMinX = Math.min(ownerMinX, vertex[0]);
                    ownerMaxX = Math.max(ownerMaxX, vertex[0]);
                    ownerMinY = Math.min(ownerMinY, vertex[1]);
                    ownerMaxY = Math.max(ownerMaxY, vertex[1]);
                }
            }
            const width = ownerMaxX - ownerMinX;
            const height = ownerMaxY - ownerMinY;
            
            // The bottom edge may not be exactly horizontal.
            let bottomMinY = ownerMaxY - height / 16;
            let bottomMinX = Number.MAX_VALUE;
            let bottomMaxX = -Number.MAX_VALUE;
            for (const hitBox of hitBoxes) {
                for (const vertex of hitBox.vertices) {
                    if (vertex[1] < bottomMinY) {
                        continue;
                    }
                    bottomMinX = Math.min(bottomMinX, vertex[0]);
                    bottomMaxX = Math.max(bottomMaxX, vertex[0]);
                }
            }
            const bottomWidth = bottomMaxX - bottomMinX;

            const dimension = { width: width / scaleX, height: height / scaleY, bottomWidth:  bottomWidth / scaleX };
            this.dimensionsByAnimationIndex[animationIndex] = dimension;

            object.setAngle(angle);
            this.tempDimension.width = width;
            this.tempDimension.height = height;
            this.tempDimension.bottomWidth = bottomWidth;
            return this.tempDimension;
        }
    }
}

/**
 * @param {gdjs.RuntimeObject} character
 * @param {gdjs.RuntimeObject} platform
 * @param {number} characterBehaviorName
 */
function isCharacterOnPlatform(
    character,
    platform,
    behaviorName
) {
    const characterBehavior = character.getBehavior(behaviorName);
    if (!characterBehavior) {
    return false;
    }
    const currentPlatform = characterBehavior.__hedgehogPlatformerExtension.currentPlatform;
    return currentPlatform && currentPlatform.owner === platform;
}

/**
 * @param {gdjs.RuntimeObject} character
 * @param {gdjs.RuntimeObject} platform
 * @param {number} characterBehaviorName
 */
function isCharacterPushingPlatform(
    character,
    platform,
    behaviorName
) {
    const characterBehavior = character.getBehavior(behaviorName);
    if (!characterBehavior) {
    return false;
    }
    const pushedPlatform = characterBehavior.__hedgehogPlatformerExtension.pushedPlatform;
    return pushedPlatform && pushedPlatform.owner === platform;
}

gdjs.__hedgehogPlatformerExtension = {
    getManager,
    PlatformObjectsManager,
    PlatformRuntimeBehavior,
    PlatformerCharacterRuntimeBehavior,
    isCharacterOnPlatform,
    isCharacterPushingPlatform,
};
};
gdjs.evtsExt__HedgehogPlatformer__DefineHelperClasses.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


gdjs.evtsExt__HedgehogPlatformer__DefineHelperClasses.userFunc0xa83340(runtimeScene, eventsFunctionContext);

}


};

gdjs.evtsExt__HedgehogPlatformer__DefineHelperClasses.func = function(runtimeScene, parentEventsFunctionContext) {
let scopeInstanceContainer = null;
var eventsFunctionContext = {
  _objectsMap: {
},
  _objectArraysMap: {
},
  _behaviorNamesMap: {
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("HedgehogPlatformer"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("HedgehogPlatformer"),
  localVariables: [],
  getObjects: function(objectName) {
    return eventsFunctionContext._objectArraysMap[objectName] || [];
  },
  getObjectsLists: function(objectName) {
    return eventsFunctionContext._objectsMap[objectName] || null;
  },
  getBehaviorName: function(behaviorName) {
    return eventsFunctionContext._behaviorNamesMap[behaviorName] || behaviorName;
  },
  createObject: function(objectName) {
    const objectsList = eventsFunctionContext._objectsMap[objectName];
    if (objectsList) {
      const object = parentEventsFunctionContext && !(scopeInstanceContainer && scopeInstanceContainer.isObjectRegistered(objectName)) ?
        parentEventsFunctionContext.createObject(objectsList.firstKey()) :
        runtimeScene.createObject(objectsList.firstKey());
      if (object) {
        objectsList.get(objectsList.firstKey()).push(object);
        eventsFunctionContext._objectArraysMap[objectName].push(object);
      }
      return object;
    }
    return null;
  },
  getInstancesCountOnScene: function(objectName) {
    const objectsList = eventsFunctionContext._objectsMap[objectName];
    let count = 0;
    if (objectsList) {
      for(const objectName in objectsList.items)
        count += parentEventsFunctionContext && !(scopeInstanceContainer && scopeInstanceContainer.isObjectRegistered(objectName)) ?
parentEventsFunctionContext.getInstancesCountOnScene(objectName) :
        runtimeScene.getInstancesCountOnScene(objectName);
    }
    return count;
  },
  getLayer: function(layerName) {
    return runtimeScene.getLayer(layerName);
  },
  getArgument: function(argName) {
    return "";
  },
  getOnceTriggers: function() { return runtimeScene.getOnceTriggers(); }
};


gdjs.evtsExt__HedgehogPlatformer__DefineHelperClasses.eventsList0(runtimeScene, eventsFunctionContext);


return;
}

gdjs.evtsExt__HedgehogPlatformer__DefineHelperClasses.registeredGdjsCallbacks = [];