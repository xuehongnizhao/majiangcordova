/* 
* @Author: 轻飘时刻
* @Date:   2017-01-21 16:42:45
* @Last Modified by:   轻飘时刻
* @Last Modified time: 2017-05-18 14:29:04
*/
var __sound = __sound || {};
__sound.bgm = {};
/**
 * 背景音乐播放的位置
 */
__sound.bgm.position = 0;
/**
 * App是否在前台运行  1 为在前台运行   0   为在后台运行
 */
__sound.isFrontStage = 1;
/**
 * 音乐是否开启    1 为开启  0 为关闭
 */
__sound.yyVolume = 1;
/**
 * 音效是否开启    1 为开启  0 为关闭
 */
__sound.yxVolume = 1;
/**
 * 音乐文件的有效路径前缀
 */
__sound.urlPrefix = "res/sound/"

/**
 * App是否在前台运行
 * 尝试重新播放背景音乐
 */
__sound.frontStage = function(){
    __sound.isFrontStage = 1
    try{ __sound.playGameMusic() }
    catch(e){ }
}

/**
 * app在后台运行
 * 尝试重新播放背景音乐
 */
__sound.backStage = function(){
    __sound.isFrontStage = 0;
    __sound.stopGameMusic();
}
/**
 * 播放背景音乐
 */
__sound.playGameMusic = function(){
    //如果app未在前台运行  不进行播放
    if(!__sound.isFrontStage)return;
    
    //设置音效音量
    Laya.SoundManager.setSoundVolume(__sound.yxVolume);
    //设置背景音乐音量
    Laya.SoundManager.setMusicVolume(__sound.yyVolume);

    // if(__sound.yyVolume == 1)Laya.SoundManager.setMusicVolume(0.1);
    if(__sound.yyVolume == 1)Laya.SoundManager.setMusicVolume(1);
    //播放背景音乐 从上次中断的位置
    __sound.bgm = Laya.SoundManager.playMusic( __sound.urlPrefix + "bgm.mp3" + config.verson_res, 0, null, __sound.bgm.position);
}
/**
 * 关闭背景音乐 音效
 */
__sound.stopGameMusic = function(){
    Laya.SoundManager.setSoundVolume(0);
    Laya.SoundManager.setMusicVolume(0);
    Laya.SoundManager.stopMusic();
}
/**
 * 播放音效
 * @value    音效文件的名称   播放路径会根据 urlPrefix 属性设置的文件路径前缀查找该文件
 */
__sound.playGameYx = function(value, num_){
    trace("播放音效：" + __sound.urlPrefix + value);
    if(num_){ value += Math.ceil(Math.random() * num_).toString() }
    Laya.SoundManager.playSound(__sound.urlPrefix + value + ".mp3" + config.verson_res, 1);
}

/**
 * 播放按钮音效
 */
__sound.button = function(){ __sound.playGameYx( "button" ); }