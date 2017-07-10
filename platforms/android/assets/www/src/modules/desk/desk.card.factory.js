/* 
* @Author: 轻飘时刻
* @Date:   2017-05-05 21:58:11
* @Last Modified by:   轻飘时刻
* @Last Modified time: 2017-05-10 19:56:13
*/
var __factory = __factory || {};

__factory.cache = function(class_, cacheCount){
    var className = game.utils.getClassName(class_)
    cacheCount = cacheCount == undefined ? 4 : cacheCount;
    
    for(var i = 0; i <= 8; i++){
        var id = game.cache.registe(class_, className+i)
        for(var m = 0; m < cacheCount; m++){
            var c = game.cache.get(id)
            c.flower = i
        }
        game.cache.recoverAll(id)
    }
    for(var i = 10; i <= 18; i++){
        var id = game.cache.registe(class_, className+i)
        for(var m = 0; m < cacheCount; m++){
            var c = game.cache.get(id)
            c.flower = i
        }
        game.cache.recoverAll(id)
    }
    for(var i = 20; i <= 28; i++){
        var id = game.cache.registe(class_, className+i)
        for(var m = 0; m < cacheCount; m++){
            var c = game.cache.get(id)
            c.flower = i
        }
        game.cache.recoverAll(id)
    }
    for(var i = 30; i <= 33; i++){
        var id = game.cache.registe(class_, className+i)
        for(var m = 0; m < cacheCount; m++){
            var c = game.cache.get(id)
            c.flower = i
        }
        game.cache.recoverAll(id)
    }
    for(var i = 40; i <= 42; i++){
        var id = game.cache.registe(class_, className+i)
        for(var m = 0; m < cacheCount; m++){
            var c = game.cache.get(id)
            c.flower = i
        }
        game.cache.recoverAll(id)
    }
    for(var i = 50; i <= 57; i++){
        var id = game.cache.registe(class_, className+i)
        for(var m = 0; m < cacheCount; m++){
            var c = game.cache.get(id)
            c.flower = i
        }
        game.cache.recoverAll(id)
    }
}

__factory.get = function(class_, i){
    var className = game.utils.getClassName(class_)
    return game.cache.get(className+i)
}

__factory.recoverAll = function(class_){
    var className = game.utils.getClassName(class_)
    for(var i = 0; i <= 8; i++){
        game.cache.recoverAll(className+i)
    }
    for(var i = 10; i <= 18; i++){
        game.cache.recoverAll(className+i)
    }
    for(var i = 20; i <= 28; i++){
        game.cache.recoverAll(className+i)
    }
    for(var i = 30; i <= 33; i++){
        game.cache.recoverAll(className+i)
    }
    for(var i = 40; i <= 42; i++){
        game.cache.recoverAll(className+i)
    }
    for(var i = 50; i <= 57; i++){
        game.cache.recoverAll(className+i)
    }
}