//=============================================================================
// Popp - AnimStateIcons
// Popp_AnimStateIcons.js
//=============================================================================
var Imported = Imported || {};
Imported.Popp_ScrollState = true;
var Popp = Popp || {};
Popp.ScrollState = Popp.ScrollState || {};

/*:
* 
* Free to use for commercial and non commercial projects
* as long as proper credit is given.
* 
* @author Poppicha (Popjustpop_TH)
* @plugindesc v1.0 All states in windows can be animated.
* 
* @param State Frame Speed
* @desc How fast state frame is.
* default: 12
* @default 12
*
*
* @help
*
* ============================================================================
* Changelog
* ============================================================================
*
* Version 0.5:
* - Create animated icons.(27-07-2022)
*
* Version 1.0:
* - Rearranged codes. It works for all default and custom windows 
* as long as they're named SceneManager._scene._statusWindow
* and SceneManager._scene._actorWindow.(17-08-2022)
*
*/


//--------------------------------------------------------
// Parameter
//--------------------------------------------------------
Popp.Parameters = PluginManager.parameters('Popp_AnimStateIcons');
Popp.Param = Popp.Param || {};

Popp.Param.StateScrollSpd = Number(Popp.Parameters['State Frame Speed'] || '12');


//--------------------------------------------------------
// function
//--------------------------------------------------------
Game_Party.prototype.stateScrollSpeed = function() {
    return Popp.Param.StateScrollSpd * 2;
};

Window_Base.prototype.drawActorIcons = function(actor, x, y, width) {
    width = width || 144;
    var icons = actor.allIcons();
    for (var i = 0; i < icons.length; i++) {
        this.drawIcon(icons[actor._statePattern] , x, y + 2);
    }
};

//--------------------------------------------------------
// Add stuff to windows
//--------------------------------------------------------
Popp.ScrollState.Window_Base_initialize = Window_Base.prototype.initialize;
Window_Base.prototype.initialize = function(x, y, width, height) {
    Popp.ScrollState.Window_Base_initialize.call(this, x, y, width, height);
    this._stateCount = 0;
};

Popp.ScrollState.Game_Actor_initMembers = Game_Actor.prototype.initMembers;
Game_Actor.prototype.initMembers = function() {
    Popp.ScrollState.Game_Actor_initMembers.call(this);
    this._statePattern = 0;
};

//--------------------------------------------------------
// Add stuff to scenes
//--------------------------------------------------------
Popp.ScrollState.Scene_Base_update = Scene_Base.prototype.update;
Scene_Base.prototype.update = function() {
    Popp.ScrollState.Scene_Base_update.call(this);
    this.updateStateScroll();
};

Scene_Base.prototype.updateStateScroll = function() {
    //status windows
    if (SceneManager._scene._statusWindow && SceneManager._scene._statusWindow.visible == true) {
        SceneManager._scene._statusWindow._stateCount++;
        if (SceneManager._scene._statusWindow._stateCount >= $gameParty.stateScrollSpeed()) {
            for (var i = 0; i < $gameParty.battleMembers().length; i++) {
                var actor = $gameParty.battleMembers()[i];
                actor._statePattern++;
                actor._statePattern %= actor.allIcons().length;
            }
            SceneManager._scene._statusWindow.refresh();
            SceneManager._scene._statusWindow._stateCount = 0;
        }
    }
    //actor windows
    if (SceneManager._scene._actorWindow && SceneManager._scene._actorWindow.visible == true) {
        SceneManager._scene._actorWindow._stateCount++;
        if (SceneManager._scene._actorWindow._stateCount >= $gameParty.stateScrollSpeed()) {
            for (var i = 0; i < $gameParty.battleMembers().length; i++) {
                var actor = $gameParty.battleMembers()[i];
                actor._statePattern++;
                actor._statePattern %= actor.allIcons().length;
            }
            SceneManager._scene._actorWindow.refresh();
            SceneManager._scene._actorWindow._stateCount = 0;
        }
    }
};
