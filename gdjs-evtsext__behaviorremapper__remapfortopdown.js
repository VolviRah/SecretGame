
gdjs.evtsExt__BehaviorRemapper__RemapForTopdown = gdjs.evtsExt__BehaviorRemapper__RemapForTopdown || {};

/**
 * Behavior generated from Top-down keyboard remapper
 */
gdjs.evtsExt__BehaviorRemapper__RemapForTopdown.RemapForTopdown = class RemapForTopdown extends gdjs.RuntimeBehavior {
  constructor(instanceContainer, behaviorData, owner) {
    super(instanceContainer, behaviorData, owner);
    this._runtimeScene = instanceContainer;

    this._onceTriggers = new gdjs.OnceTriggers();
    this._behaviorData = {};
    this._sharedData = gdjs.evtsExt__BehaviorRemapper__RemapForTopdown.RemapForTopdown.getSharedData(
      instanceContainer,
      behaviorData.name
    );
    
    this._behaviorData.Up = behaviorData.Up !== undefined ? behaviorData.Up : "w";
    this._behaviorData.Left = behaviorData.Left !== undefined ? behaviorData.Left : "a";
    this._behaviorData.Right = behaviorData.Right !== undefined ? behaviorData.Right : "d";
    this._behaviorData.Down = behaviorData.Down !== undefined ? behaviorData.Down : "s";
    this._behaviorData.Topdown = behaviorData.Topdown !== undefined ? behaviorData.Topdown : "";
  }

  // Hot-reload:
  updateFromBehaviorData(oldBehaviorData, newBehaviorData) {
    
    if (oldBehaviorData.Up !== newBehaviorData.Up)
      this._behaviorData.Up = newBehaviorData.Up;
    if (oldBehaviorData.Left !== newBehaviorData.Left)
      this._behaviorData.Left = newBehaviorData.Left;
    if (oldBehaviorData.Right !== newBehaviorData.Right)
      this._behaviorData.Right = newBehaviorData.Right;
    if (oldBehaviorData.Down !== newBehaviorData.Down)
      this._behaviorData.Down = newBehaviorData.Down;
    if (oldBehaviorData.Topdown !== newBehaviorData.Topdown)
      this._behaviorData.Topdown = newBehaviorData.Topdown;

    return true;
  }

  // Network sync:
  getNetworkSyncData(syncOptions) {
    return {
      ...super.getNetworkSyncData(syncOptions),
      props: {
        
    Up: this._behaviorData.Up,
    Left: this._behaviorData.Left,
    Right: this._behaviorData.Right,
    Down: this._behaviorData.Down,
    Topdown: this._behaviorData.Topdown,
      }
    };
  }
  updateFromNetworkSyncData(networkSyncData, options) {
    super.updateFromNetworkSyncData(networkSyncData, options);
    
    if (networkSyncData.props.Up !== undefined)
      this._behaviorData.Up = networkSyncData.props.Up;
    if (networkSyncData.props.Left !== undefined)
      this._behaviorData.Left = networkSyncData.props.Left;
    if (networkSyncData.props.Right !== undefined)
      this._behaviorData.Right = networkSyncData.props.Right;
    if (networkSyncData.props.Down !== undefined)
      this._behaviorData.Down = networkSyncData.props.Down;
    if (networkSyncData.props.Topdown !== undefined)
      this._behaviorData.Topdown = networkSyncData.props.Topdown;
  }

  // Properties:
  
  _getUp() {
    return this._behaviorData.Up !== undefined ? this._behaviorData.Up : "w";
  }
  _setUp(newValue) {
    this._behaviorData.Up = newValue;
  }
  _getLeft() {
    return this._behaviorData.Left !== undefined ? this._behaviorData.Left : "a";
  }
  _setLeft(newValue) {
    this._behaviorData.Left = newValue;
  }
  _getRight() {
    return this._behaviorData.Right !== undefined ? this._behaviorData.Right : "d";
  }
  _setRight(newValue) {
    this._behaviorData.Right = newValue;
  }
  _getDown() {
    return this._behaviorData.Down !== undefined ? this._behaviorData.Down : "s";
  }
  _setDown(newValue) {
    this._behaviorData.Down = newValue;
  }
  _getTopdown() {
    return this._behaviorData.Topdown !== undefined ? this._behaviorData.Topdown : "";
  }
  _setTopdown(newValue) {
    this._behaviorData.Topdown = newValue;
  }
}

/**
 * Shared data generated from Top-down keyboard remapper
 */
gdjs.evtsExt__BehaviorRemapper__RemapForTopdown.RemapForTopdown.SharedData = class RemapForTopdownSharedData {
  constructor(sharedData) {
    
  }
  
  // Shared properties:
  
}

gdjs.evtsExt__BehaviorRemapper__RemapForTopdown.RemapForTopdown.getSharedData = function(instanceContainer, behaviorName) {
  if (!instanceContainer._BehaviorRemapper_RemapForTopdownSharedData) {
    const initialData = instanceContainer.getInitialSharedDataForBehavior(
      behaviorName
    );
    instanceContainer._BehaviorRemapper_RemapForTopdownSharedData = new gdjs.evtsExt__BehaviorRemapper__RemapForTopdown.RemapForTopdown.SharedData(
      initialData
    );
  }
  return instanceContainer._BehaviorRemapper_RemapForTopdownSharedData;
}

// Methods:
gdjs.evtsExt__BehaviorRemapper__RemapForTopdown.RemapForTopdown.prototype.doStepPreEventsContext = {};
gdjs.evtsExt__BehaviorRemapper__RemapForTopdown.RemapForTopdown.prototype.doStepPreEventsContext.idToCallbackMap = new Map();
gdjs.evtsExt__BehaviorRemapper__RemapForTopdown.RemapForTopdown.prototype.doStepPreEventsContext.GDObjectObjects1= [];
gdjs.evtsExt__BehaviorRemapper__RemapForTopdown.RemapForTopdown.prototype.doStepPreEventsContext.GDObjectObjects2= [];


gdjs.evtsExt__BehaviorRemapper__RemapForTopdown.RemapForTopdown.prototype.doStepPreEventsContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.input.isKeyPressed(runtimeScene, eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getUp());
if (isConditionTrue_0) {
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__BehaviorRemapper__RemapForTopdown.RemapForTopdown.prototype.doStepPreEventsContext.GDObjectObjects1);
{for(var i = 0, len = gdjs.evtsExt__BehaviorRemapper__RemapForTopdown.RemapForTopdown.prototype.doStepPreEventsContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__BehaviorRemapper__RemapForTopdown.RemapForTopdown.prototype.doStepPreEventsContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Topdown")).simulateUpKey();
}
}
}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.input.isKeyPressed(runtimeScene, eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getLeft());
if (isConditionTrue_0) {
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__BehaviorRemapper__RemapForTopdown.RemapForTopdown.prototype.doStepPreEventsContext.GDObjectObjects1);
{for(var i = 0, len = gdjs.evtsExt__BehaviorRemapper__RemapForTopdown.RemapForTopdown.prototype.doStepPreEventsContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__BehaviorRemapper__RemapForTopdown.RemapForTopdown.prototype.doStepPreEventsContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Topdown")).simulateLeftKey();
}
}
}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.input.isKeyPressed(runtimeScene, eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getRight());
if (isConditionTrue_0) {
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__BehaviorRemapper__RemapForTopdown.RemapForTopdown.prototype.doStepPreEventsContext.GDObjectObjects1);
{for(var i = 0, len = gdjs.evtsExt__BehaviorRemapper__RemapForTopdown.RemapForTopdown.prototype.doStepPreEventsContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__BehaviorRemapper__RemapForTopdown.RemapForTopdown.prototype.doStepPreEventsContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Topdown")).simulateRightKey();
}
}
}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.input.isKeyPressed(runtimeScene, eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getDown());
if (isConditionTrue_0) {
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__BehaviorRemapper__RemapForTopdown.RemapForTopdown.prototype.doStepPreEventsContext.GDObjectObjects1);
{for(var i = 0, len = gdjs.evtsExt__BehaviorRemapper__RemapForTopdown.RemapForTopdown.prototype.doStepPreEventsContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__BehaviorRemapper__RemapForTopdown.RemapForTopdown.prototype.doStepPreEventsContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Topdown")).simulateDownKey();
}
}
}

}


};

gdjs.evtsExt__BehaviorRemapper__RemapForTopdown.RemapForTopdown.prototype.doStepPreEvents = function(parentEventsFunctionContext) {
this._onceTriggers.startNewFrame();
var that = this;
var runtimeScene = this._runtimeScene;
let scopeInstanceContainer = null;
var thisObjectList = [this.owner];
var Object = Hashtable.newFrom({Object: thisObjectList});
var Behavior = this.name;
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
},
  _objectArraysMap: {
"Object": thisObjectList
},
  _behaviorNamesMap: {
"Behavior": Behavior
, "Topdown": this._getTopdown()
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("BehaviorRemapper"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("BehaviorRemapper"),
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
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__BehaviorRemapper__RemapForTopdown.RemapForTopdown.prototype.doStepPreEventsContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__BehaviorRemapper__RemapForTopdown.RemapForTopdown.prototype.doStepPreEventsContext.GDObjectObjects2.length = 0;

gdjs.evtsExt__BehaviorRemapper__RemapForTopdown.RemapForTopdown.prototype.doStepPreEventsContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__BehaviorRemapper__RemapForTopdown.RemapForTopdown.prototype.doStepPreEventsContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__BehaviorRemapper__RemapForTopdown.RemapForTopdown.prototype.doStepPreEventsContext.GDObjectObjects2.length = 0;


return;
}
gdjs.evtsExt__BehaviorRemapper__RemapForTopdown.RemapForTopdown.prototype.SetCustomContext = {};
gdjs.evtsExt__BehaviorRemapper__RemapForTopdown.RemapForTopdown.prototype.SetCustomContext.idToCallbackMap = new Map();
gdjs.evtsExt__BehaviorRemapper__RemapForTopdown.RemapForTopdown.prototype.SetCustomContext.GDObjectObjects1= [];
gdjs.evtsExt__BehaviorRemapper__RemapForTopdown.RemapForTopdown.prototype.SetCustomContext.GDObjectObjects2= [];


gdjs.evtsExt__BehaviorRemapper__RemapForTopdown.RemapForTopdown.prototype.SetCustomContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = eventsFunctionContext.getOnceTriggers().triggerOnce(16260796);
}
if (isConditionTrue_0) {
{eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._setUp(eventsFunctionContext.getArgument("up"))
}
{eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._setLeft(eventsFunctionContext.getArgument("left"))
}
{eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._setRight(eventsFunctionContext.getArgument("right"))
}
{eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._setDown(eventsFunctionContext.getArgument("down"))
}
}

}


};

gdjs.evtsExt__BehaviorRemapper__RemapForTopdown.RemapForTopdown.prototype.SetCustom = function(up, left, down, right, parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._runtimeScene;
let scopeInstanceContainer = null;
var thisObjectList = [this.owner];
var Object = Hashtable.newFrom({Object: thisObjectList});
var Behavior = this.name;
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
},
  _objectArraysMap: {
"Object": thisObjectList
},
  _behaviorNamesMap: {
"Behavior": Behavior
, "Topdown": this._getTopdown()
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("BehaviorRemapper"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("BehaviorRemapper"),
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
if (argName === "up") return up;
if (argName === "left") return left;
if (argName === "down") return down;
if (argName === "right") return right;
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__BehaviorRemapper__RemapForTopdown.RemapForTopdown.prototype.SetCustomContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__BehaviorRemapper__RemapForTopdown.RemapForTopdown.prototype.SetCustomContext.GDObjectObjects2.length = 0;

gdjs.evtsExt__BehaviorRemapper__RemapForTopdown.RemapForTopdown.prototype.SetCustomContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__BehaviorRemapper__RemapForTopdown.RemapForTopdown.prototype.SetCustomContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__BehaviorRemapper__RemapForTopdown.RemapForTopdown.prototype.SetCustomContext.GDObjectObjects2.length = 0;


return;
}
gdjs.evtsExt__BehaviorRemapper__RemapForTopdown.RemapForTopdown.prototype.SetPresetContext = {};
gdjs.evtsExt__BehaviorRemapper__RemapForTopdown.RemapForTopdown.prototype.SetPresetContext.idToCallbackMap = new Map();
gdjs.evtsExt__BehaviorRemapper__RemapForTopdown.RemapForTopdown.prototype.SetPresetContext.GDObjectObjects1= [];
gdjs.evtsExt__BehaviorRemapper__RemapForTopdown.RemapForTopdown.prototype.SetPresetContext.GDObjectObjects2= [];


gdjs.evtsExt__BehaviorRemapper__RemapForTopdown.RemapForTopdown.prototype.SetPresetContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{



}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = (eventsFunctionContext.getArgument("options") == "WASD");
}
if (isConditionTrue_0) {
{eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._setUp("w")
}
{eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._setLeft("a")
}
{eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._setDown("s")
}
{eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._setRight("d")
}
}

}


{



}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = (eventsFunctionContext.getArgument("options") == "ZQSD");
}
if (isConditionTrue_0) {
{eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._setUp("z")
}
{eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._setLeft("q")
}
{eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._setDown("s")
}
{eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._setDown("d")
}
}

}


{



}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = (eventsFunctionContext.getArgument("options") == "Numpad");
}
if (isConditionTrue_0) {
{eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._setUp("NumpadUp")
}
{eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._setLeft("NumpadLeft")
}
{eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._setDown("NumpadDown")
}
{eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._setRight("NumpadRight")
}
}

}


{



}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = (eventsFunctionContext.getArgument("options") == "IJKL");
}
if (isConditionTrue_0) {
{eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._setUp("i")
}
{eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._setLeft("j")
}
{eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._setDown("k")
}
{eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._setRight("l")
}
}

}


};

gdjs.evtsExt__BehaviorRemapper__RemapForTopdown.RemapForTopdown.prototype.SetPreset = function(options, parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._runtimeScene;
let scopeInstanceContainer = null;
var thisObjectList = [this.owner];
var Object = Hashtable.newFrom({Object: thisObjectList});
var Behavior = this.name;
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
},
  _objectArraysMap: {
"Object": thisObjectList
},
  _behaviorNamesMap: {
"Behavior": Behavior
, "Topdown": this._getTopdown()
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("BehaviorRemapper"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("BehaviorRemapper"),
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
if (argName === "options") return options;
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__BehaviorRemapper__RemapForTopdown.RemapForTopdown.prototype.SetPresetContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__BehaviorRemapper__RemapForTopdown.RemapForTopdown.prototype.SetPresetContext.GDObjectObjects2.length = 0;

gdjs.evtsExt__BehaviorRemapper__RemapForTopdown.RemapForTopdown.prototype.SetPresetContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__BehaviorRemapper__RemapForTopdown.RemapForTopdown.prototype.SetPresetContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__BehaviorRemapper__RemapForTopdown.RemapForTopdown.prototype.SetPresetContext.GDObjectObjects2.length = 0;


return;
}


gdjs.registerBehavior("BehaviorRemapper::RemapForTopdown", gdjs.evtsExt__BehaviorRemapper__RemapForTopdown.RemapForTopdown);
