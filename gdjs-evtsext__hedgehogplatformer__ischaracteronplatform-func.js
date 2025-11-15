
if (typeof gdjs.evtsExt__HedgehogPlatformer__IsCharacterOnPlatform !== "undefined") {
  gdjs.evtsExt__HedgehogPlatformer__IsCharacterOnPlatform.registeredGdjsCallbacks.forEach(callback =>
    gdjs._unregisterCallback(callback)
  );
}

gdjs.evtsExt__HedgehogPlatformer__IsCharacterOnPlatform = {};
gdjs.evtsExt__HedgehogPlatformer__IsCharacterOnPlatform.idToCallbackMap = new Map();
gdjs.evtsExt__HedgehogPlatformer__IsCharacterOnPlatform.GDCharacterObjects1= [];
gdjs.evtsExt__HedgehogPlatformer__IsCharacterOnPlatform.GDPlatformObjects1= [];


gdjs.evtsExt__HedgehogPlatformer__IsCharacterOnPlatform.userFunc0xe7d3c0 = function GDJSInlineCode(runtimeScene, eventsFunctionContext) {
"use strict";
const { isCharacterOnPlatform } = gdjs.__hedgehogPlatformerExtension;

const characters = eventsFunctionContext.getObjectsLists("Character");
const behaviorName = eventsFunctionContext.getBehaviorName("HedgehogCharacter");
const platform = eventsFunctionContext.getObjectsLists("Platform");

eventsFunctionContext.returnValue = gdjs.evtTools.object.twoListsTest(
    isCharacterOnPlatform,
    characters,
    platform,
    false,
    behaviorName
);

};
gdjs.evtsExt__HedgehogPlatformer__IsCharacterOnPlatform.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


gdjs.evtsExt__HedgehogPlatformer__IsCharacterOnPlatform.userFunc0xe7d3c0(runtimeScene, eventsFunctionContext);

}


};

gdjs.evtsExt__HedgehogPlatformer__IsCharacterOnPlatform.func = function(runtimeScene, Character, HedgehogCharacter, Platform, HedgehogPlatform, parentEventsFunctionContext) {
let scopeInstanceContainer = null;
var eventsFunctionContext = {
  _objectsMap: {
"Character": Character
, "Platform": Platform
},
  _objectArraysMap: {
"Character": gdjs.objectsListsToArray(Character)
, "Platform": gdjs.objectsListsToArray(Platform)
},
  _behaviorNamesMap: {
"HedgehogCharacter": HedgehogCharacter
, "HedgehogPlatform": HedgehogPlatform
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

gdjs.evtsExt__HedgehogPlatformer__IsCharacterOnPlatform.GDCharacterObjects1.length = 0;
gdjs.evtsExt__HedgehogPlatformer__IsCharacterOnPlatform.GDPlatformObjects1.length = 0;

gdjs.evtsExt__HedgehogPlatformer__IsCharacterOnPlatform.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__HedgehogPlatformer__IsCharacterOnPlatform.GDCharacterObjects1.length = 0;
gdjs.evtsExt__HedgehogPlatformer__IsCharacterOnPlatform.GDPlatformObjects1.length = 0;


return !!eventsFunctionContext.returnValue;
}

gdjs.evtsExt__HedgehogPlatformer__IsCharacterOnPlatform.registeredGdjsCallbacks = [];