//=============================================================================
//
//=============================================================================
/*:
 * @plugindesc 按键脚本
 * @author Qiu Jiu
 * @help Nobi-Button.js [V1.0]
 *
 *====================================
 *1.支持开关控制和场景显示。
 *  显示条件分为三种：a.额外脚本显示设置 b.场景显示设置 c.开关显示设置
 *  这三种的优先级为a>b>c。
 *  即只要a是true，那么无论b和c是什么，按钮都会显示。
 *  当a为false时，若b为true，那么无论c是什么，按钮都会显示。
 *  当a为false且b为false时，若c为true，则按钮会显示，否则不显示。
 *2.自适应手机窗口，可使用bw,bh,w,h,sx,sw,sy进行设计。
 *  在手机上时w和h读取的是手机《整个屏幕大小》。
 *  在电脑上时w和h读取的是游戏窗口大小(package.json中指定)。
 *  bw和bh读取的是按钮的绝对大小，这个大小会随着按键的缩放率，按键整体的缩放率进行自动调整。
 *  sw和sh代表游戏画面的宽度和高度。
 *  sx代表游戏画面的x坐标，等效于(w-sw)/2
 *3.在游戏菜单的“选项”一栏可以对选项进行调节。
 *4.方向键中的圆可作为摇杆进行拖动。
 *  也可以直接点击方向键进行移动，且可适配八方移动。
 *5.支持多点触控。
 *6.需要将按键图片放入img/button下。
 *7.禁用鼠标/手指点击移动的脚本指令：QJ.B.setMove(false);
 *  启用鼠标/手指点击移动的脚本指令：QJ.B.setMove(true);
 *8.禁用鼠标右键/双指的脚本指令：QJ.B.setTwo(false);
 *  启用鼠标右键/双指的脚本指令：QJ.B.setTwo(true);
 *9.修改按键大小，位置和不透明度可以用指令：
 *  QJ.B.setButton(id,scale,x,y,opacity);
 *  其中：
 *  id代表在插件参数中指定的按钮名称。
 *  scale代表大小。
 *  x和y代表位置，既可以写数字，也可以用bw,w,bh,h等，注意加上半角(英文)引号。
 *  opacity代表不透明度，范围为0-255。
 *10.“是否记忆按键设置”：不记忆的话，每次载入存档后，使用QJ.B.setButton修改的指令和玩家在设置中
 *  设置的按键大小将进行重置。
 *====================================
 *
 * @param button
 * @type struct<buttonList>[]
 * @text 按钮设置
 * @desc 按钮设置
 * @default ["{\"id\":\"z\",\"namex\":\"Btnz\",\"x\":\"w-bw\",\"y\":\"h-bh\",\"scale\":\"100\",\"opacity\":\"255\",\"type\":\"pressed\",\"commonevent\":\"0\",\"script\":\"\",\"switch\":\"1\",\"switchScript\":\"\",\"button\":\"ok\",\"showOnScene_Title\":\"true\",\"showOnScene_Map\":\"true\",\"showOnScene_Menu\":\"true\",\"showOnScene_Item\":\"true\",\"showOnScene_Skill\":\"true\",\"showOnScene_Equip\":\"true\",\"showOnScene_Save\":\"true\",\"showOnScene_Load\":\"true\",\"showOnScene_GameEnd\":\"true\",\"showOnScene_Shop\":\"true\",\"showOnScene_Name\":\"true\",\"showOnScene_Battle\":\"true\",\"showOnScene_Gameover\":\"true\",\"showOn\":\"\"}","{\"id\":\"esc\",\"namex\":\"BtnEsc\",\"x\":\"w-bw-24\",\"y\":\"24\",\"scale\":\"100\",\"opacity\":\"255\",\"type\":\"pressed\",\"commonevent\":\"0\",\"script\":\"\",\"switch\":\"1\",\"switchScript\":\"\",\"button\":\"escape\",\"showOnScene_Title\":\"true\",\"showOnScene_Map\":\"true\",\"showOnScene_Menu\":\"true\",\"showOnScene_Item\":\"true\",\"showOnScene_Skill\":\"true\",\"showOnScene_Equip\":\"true\",\"showOnScene_Save\":\"true\",\"showOnScene_Load\":\"true\",\"showOnScene_GameEnd\":\"true\",\"showOnScene_Shop\":\"true\",\"showOnScene_Name\":\"true\",\"showOnScene_Battle\":\"true\",\"showOnScene_Gameover\":\"true\",\"showOn\":\"\"}"]
 *
 * @param dirButton
 * @type struct<dirButtonList>
 * @text 方向键按钮设置
 * @desc 方向键按钮设置
 * @default {"id":"dir","name":"DirPad","namex":"BtnCir","x":"0","y":"h-bh","scale":"100","opacity":"100","type":"pressed","commonevent":"0","script":"","switch":"1","switchScript":"","showOnScene_Title":"true","showOnScene_Map":"true","showOnScene_Menu":"true","showOnScene_Item":"true","showOnScene_Skill":"true","showOnScene_Equip":"true","showOnScene_Save":"true","showOnScene_Load":"true","showOnScene_GameEnd":"true","showOnScene_Shop":"true","showOnScene_Name":"true","showOnScene_Battle":"true","showOnScene_Gameover":"true","showOn":""}
 *
 * @param showOnPc
 * @type boolean
 * @text 是否在电脑上显示
 * @desc 是否在电脑上显示
 * @default true
 *
 * @param forBidTwo
 * @type boolean
 * @text 是否禁止双指
 * @desc是否禁止系统自带的双指取消(手机端)
 * @default true
 *
 * @param mobile
 * @type number
 * @min 0
 * @text 初始放大率
 * @desc 初始放大率
 * @default 100
 *
 * @param forBidDestination
 * @type boolean
 * @text 是否取消点击移动
 * @desc 初始时是否取消掉点击移动，注意，取消掉后也无法再直接与事件进行互动，但可以用指令恢复。
 * @default false
 *
 * @param option
 * @type boolean
 * @text 是否可调整大小
 * @desc 是否在设置页面增加让玩家调整按钮大小的选项
 * @default true
 *
 * @param remember
 * @type boolean
 * @text 是否记忆按键设置
 * @desc 是否记忆按键设置，详情请看插件说明
 * @default true
 *
*/
/*~struct~buttonList:
 *
 * @param id
 * @type text
 * @text 按钮名字
 * @desc 按钮名字，不能重复
 * @default 
 *
 * @param namex
 * @type file
 * @dir img/button
 * @text 按钮图片文件名
 * @desc 按钮图片文件名，分上下两部分，上面为未按下，下面为按下。
 * @default 
 *
 * @param x
 * @type text
 * @text x坐标
 * @desc x坐标，使用w代表窗口整体高度（包括黑边），使用bw代表按钮整体宽度，sx代表游戏页面x坐标
 * @default 0
 *
 * @param y
 * @type text
 * @text y坐标 
 * @desc y坐标，使用h代表窗口整体高度（包括黑边），使用bh代表按钮整体高度
 * @default 0
 *
 * @param scale
 * @type number
 * @min 0
 * @text 放大率
 * @desc 放大率
 * @default 100
 *
 * @param opacity
 * @type number
 * @min 0
 * @max 255
 * @text 不透明度
 * @desc 不透明度
 * @default 255
 *
 * @param type
 * @type select
 * @text 触发方式
 * @desc 触发方式
 * @option 单击(松手后执行)triggered
 * @value triggered
 * @option 按下(按下后执行)pressed
 * @value pressed
 * @default pressed
 *
 * @param commonevent
 * @type common_event
 * @text 按下后执行的公共事件
 * @desc 按下后执行的公共事件，写0时不触发公共事件
 * @default 0
 *
 * @param script
 * @type note
 * @text 按下后执行的脚本
 * @desc 按下后执行的脚本，不用空着就行
 * @default 
 *
 * @param switch
 * @type switch
 * @text 显示按钮的开关
 * @desc 显示按钮的开关
 * @default 1
 *
 * @param switchScript
 * @type note
 * @text 更多显示条件
 * @desc 更多显示条件，不用空着就行
 * @default 
 *
 * @param button
 * @type select
 * @text 按钮
 * @desc 按钮，按下此图片相当于按下某按钮
 * @option 
 * @value 
 * @option shift
 * @value shift
 * @option control
 * @value control
 * @option escape/cancel
 * @value escape
 * @option space/ok
 * @value ok
 * @option pageup
 * @value pageup
 * @option pagedown
 * @value pagedown
 * @option a
 * @value a
 * @option b
 * @value b
 * @option c
 * @value c
 * @option d
 * @value d
 * @option e
 * @value e
 * @option f
 * @value f
 * @option g
 * @value g
 * @option h
 * @value h
 * @option i
 * @value i
 * @option j
 * @value j
 * @option k
 * @value k
 * @option l
 * @value l
 * @option m
 * @value m
 * @option n
 * @value n
 * @option o
 * @value o
 * @option p
 * @value p
 * @option q
 * @value q
 * @option r
 * @value r
 * @option s
 * @value s
 * @option t
 * @value t
 * @option u
 * @value u
 * @option v
 * @value v
 * @option w
 * @value w
 * @option x
 * @value x
 * @option y
 * @value y
 * @option z
 * @value z
 * @option 0
 * @value 0
 * @option 1
 * @value 1
 * @option 2
 * @value 2
 * @option 3
 * @value 3
 * @option 4
 * @value 4
 * @option 5
 * @value 5
 * @option 6
 * @value 6
 * @option 7
 * @value 7
 * @option 8
 * @value 8
 * @option 9
 * @value 9
 * @default 
 *
 * @param showOnScene_Title
 * @type boolean
 * @text 标题界面
 * @desc 是否在标题界面显示
 * @default true
 *
 * @param showOnScene_Map
 * @type boolean
 * @text 地图界面
 * @desc 是否在地图界面显示
 * @default true
 *
 * @param showOnScene_Menu
 * @type boolean
 * @text 菜单界面
 * @desc 是否在菜单界面显示
 * @default true
 *
 * @param showOnScene_Item
 * @type boolean
 * @text 物品栏
 * @desc 是否在物品栏显示
 * @default true
 *
 * @param showOnScene_Skill
 * @type boolean
 * @text 技能界面
 * @desc 是否在技能界面显示
 * @default true
 *
 * @param showOnScene_Equip
 * @type boolean
 * @text 装备界面
 * @desc 是否在装备界面显示
 * @default true
 *
 * @param showOnScene_Save
 * @type boolean
 * @text 存档界面
 * @desc 是否在存档界面显示
 * @default true
 *
 * @param showOnScene_Load
 * @type boolean
 * @text 加载界面
 * @desc 是否在加载界面显示
 * @default true
 *
 * @param showOnScene_GameEnd
 * @type boolean
 * @text 退出界面
 * @desc 是否在退出界面显示
 * @default true
 *
 * @param showOnScene_Shop
 * @type boolean
 * @text 商店界面
 * @desc 是否在商店界面显示
 * @default true
 *
 * @param showOnScene_Name
 * @type boolean
 * @text 写名字
 * @desc 是否在写名字界面显示
 * @default true
 *
 * @param showOnScene_Battle
 * @type boolean
 * @text 战斗界面
 * @desc 是否在战斗界面显示
 * @default true
 *
 * @param showOnScene_Gameover
 * @type boolean
 * @text 游戏结束界面
 * @desc 是否在游戏结束界面显示
 * @default true
 *
 * @param showOnScene_Options
 * @type boolean
 * @text 设置界面
 * @desc 是否在设置界面显示
 * @default true
 *
 * @param showOn
 * @type text
 * @text 其余显示设置
 * @desc 要在“Scene_Happy”场景显示，则写Scene_Happy，若有多个用|分割，例如：Scene_Happy|Scene_Sad。
 * @default 
 *
*/
/*~struct~dirButtonList:
 *
 * @param id
 * @type text
 * @text 按钮名字
 * @desc 按钮名字，尽量不要修改 
 * @default dir
 *
 * @param name
 * @type file
 * @dir img/button
 * @text 按钮图片文件名
 * @desc 按钮图片文件名
 * @default 
 *
 * @param namex
 * @type file
 * @dir img/button
 * @text 中间被拖动的圈的图片
 * @desc 中间被拖动的圈的图片
 * @default 
 *
 * @param x
 * @type text
 * @text x坐标
 * @desc x坐标，使用w代表窗口整体高度（包括黑边），使用bw代表按钮整体宽度，sx代表游戏页面x坐标
 * @default 0
 *
 * @param y
 * @type text
 * @text y坐标
 * @desc y坐标，使用h代表窗口整体高度（包括黑边），使用bh代表按钮整体宽度
 * @default 0
 *
 * @param scale
 * @type number
 * @min 0
 * @text 放大率
 * @desc 放大率
 * @default 100
 *
 * @param opacity
 * @type number
 * @min 0
 * @max 255
 * @text 不透明度
 * @desc 不透明度
 * @default 255
 *
 * @param type
 * @type select
 * @text 触发方式
 * @desc 触发方式
 * @option 单击(松手后执行)triggered
 * @value triggered
 * @option 按下(按下后执行)pressed
 * @value pressed
 * @default pressed
 *
 * @param commonevent
 * @type common_event
 * @text 按下后执行的公共事件
 * @desc 按下后执行的公共事件，写0时不触发公共事件
 * @default 0
 *
 * @param script
 * @type note
 * @text 按下后执行的脚本
 * @desc 按下后执行的脚本，不用空着就行
 * @default 
 *
 * @param switch
 * @type switch
 * @text 显示按钮的开关
 * @desc 显示按钮的开关
 * @default 1
 *
 * @param switchScript
 * @type note
 * @text 更多显示条件
 * @desc 更多显示条件，不用空着就行
 * @default
 *
 * @param showOnScene_Title
 * @type boolean
 * @text 标题界面
 * @desc 是否在标题界面显示
 * @default true
 *
 * @param showOnScene_Map
 * @type boolean
 * @text 地图界面
 * @desc 是否在地图界面显示
 * @default true
 *
 * @param showOnScene_Menu
 * @type boolean
 * @text 菜单界面
 * @desc 是否在菜单界面显示
 * @default true
 *
 * @param showOnScene_Item
 * @type boolean
 * @text 物品栏
 * @desc 是否在物品栏显示
 * @default true
 *
 * @param showOnScene_Skill
 * @type boolean
 * @text 技能界面
 * @desc 是否在技能界面显示
 * @default true
 *
 * @param showOnScene_Equip
 * @type boolean
 * @text 装备界面
 * @desc 是否在装备界面显示
 * @default true
 *
 * @param showOnScene_Save
 * @type boolean
 * @text 存档界面
 * @desc 是否在存档界面显示
 * @default true
 *
 * @param showOnScene_Load
 * @type boolean
 * @text 加载界面
 * @desc 是否在加载界面显示
 * @default true
 *
 * @param showOnScene_GameEnd
 * @type boolean
 * @text 退出界面
 * @desc 是否在退出界面显示
 * @default true
 *
 * @param showOnScene_Shop
 * @type boolean
 * @text 商店界面
 * @desc 是否在商店界面显示
 * @default true
 *
 * @param showOnScene_Name
 * @type boolean
 * @text 写名字
 * @desc 是否在写名字界面显示
 * @default true
 *
 * @param showOnScene_Battle
 * @type boolean
 * @text 战斗界面
 * @desc 是否在战斗界面显示
 * @default true
 *
 * @param showOnScene_Gameover
 * @type boolean
 * @text 游戏结束界面
 * @desc 是否在游戏结束界面显示
 * @default true
 *
 * @param showOnScene_Options
 * @type boolean
 * @text 设置界面
 * @desc 是否在设置界面显示
 * @default true
 *
 * @param showOn
 * @type text
 * @text 其余显示设置
 * @desc 要在“Scene_Happy”场景显示，则写Scene_Happy，若有多个用|分割，例如：Scene_Happy|Scene_Sad。
 * @default
*/
//=============================================================================
//
//=============================================================================
var _0x82ab=['_scene','background-position','_QJBRememberSize','split','pressed','addVolumeOptions','touchend','parse','-0px\x20-','switch','toString','forBidDestination','addCommand','userSelect','未找到id为','touchx','clientY','PressAnim','createElement','delta','scale','call','reserveCommonEvent','widthx','substr','mobile','opacity','isMobileDevice','Press','setInput','style','length','clearInput','mouseleave','remember','width','touchy','index','constructor','left','innerWidth','setButton','changeValue','touchmove','updateShow','isSceneChanging','DivX','floor','Div','apply','show','px\x20','_currentState','update','heightx','NBButtonSize','getConfigValue','clamp','initialize','option','script','loadRemember','switchScript','button','_buttonData','triggered','runData','down','replace','mouseup','setDestination','value','push','none','popScene','type','background-size','targetTouches','processOk','resetData','appendChild','display','block','prototype','addEventListener','start','mousedown','showOn','abs','refreshPosition','clientX','refreshData','Data','judge','right','mouseout','height','position','background-image','getElementById','commonevent','touchstart','top','documentElement'];var _0x5a9a=function(_0x82ab9,_0x5a9aa4){_0x82ab9=_0x82ab9-0x0;var _0x38ef0a=_0x82ab[_0x82ab9];return _0x38ef0a;};var QJ=QJ||{};QJ['B']=QJ['B']||{};var Imported=Imported||{};Imported['QJButton']=!![];var NBRealZoom=0x1,NBButtonList=[];setRealZoom=(_0x14666f,_0x1833a2)=>{if(_0x14666f>=0x0)NBRealZoom=_0x14666f;if(_0x1833a2==0x2){for(var _0x5e66a8 of NBButtonList){if(_0x5e66a8['DivX']){_0x5e66a8[_0x5a9a('0x59')]();break;}}}else{for(var _0x5e66a8 of NBButtonList){if(_0x1833a2==0x1&&_0x5e66a8[_0x5a9a('0x2e')])continue;_0x5e66a8['refreshPosition']();}}if(QJ['B'][_0x5a9a('0x22')])$gameVariables['_QJBRememberSize']=NBRealZoom;};(()=>{const _0x2a4dae='Nobi-Button';const _0x399f88=PluginManager['parameters'](_0x2a4dae);const _0x29eb04=eval(_0x399f88['button'])||[];const _0x1ab2c3=JsonEx[_0x5a9a('0x7')](_0x399f88['dirButton'])||[];const _0x34be37=[];const _0x34cab0=eval(_0x399f88['showOnPc']);const _0x3bb7c7=Utils['isMobileDevice']()||_0x34cab0;QJ['B']['remember']=eval(_0x399f88['remember']);const _0x1d9908=eval(_0x399f88[_0x5a9a('0x3b')]);let _0x556486=eval(_0x399f88['forBidTwo']);let _0x3773aa=eval(_0x399f88[_0x5a9a('0xb')]);NBRealZoom=_0x399f88[_0x5a9a('0x19')]/0x64;QJ['B']['setTwo']=_0x4e1d88=>_0x556486=!_0x4e1d88;QJ['B']['setMove']=_0x38351c=>_0x3773aa=!_0x38351c;QJ['B'][_0x5a9a('0x29')]=(_0x26f59a,_0x50cda6,_0x230f58,_0x3cd912,_0x42e77c)=>{let _0x81dcca=null;for(let _0x427024 of NBButtonList){if(_0x427024[_0x5a9a('0x5c')]['id']==_0x26f59a){_0x81dcca=_0x427024;break;}}if(!_0x81dcca){console['warn'](_0x5a9a('0xe')+_0x26f59a+'的按钮。');return;}_0x81dcca['resetData'](_0x50cda6,_0x230f58,_0x3cd912,_0x42e77c);};if(_0x556486){TouchInput['_onCancel']=function(_0x3de679,_0x2894bc){this['_x']=_0x3de679;this['_y']=_0x2894bc;};}const _0x51733f=Game_Variables['prototype']['initialize'];Game_Variables[_0x5a9a('0x53')][_0x5a9a('0x3a')]=function(){_0x51733f[_0x5a9a('0x15')](this);this['_buttonData']={};};Game_Variables[_0x5a9a('0x53')]['button']=function(_0x1cdc09){return this[_0x5a9a('0x40')][_0x1cdc09];};Game_Variables['prototype'][_0x5a9a('0x29')]=function(_0x245aeb,_0x14d93e){this['_buttonData'][_0x245aeb]=_0x14d93e;};const _0x1966d6=Game_Temp['prototype']['setDestination'];Game_Temp['prototype'][_0x5a9a('0x46')]=function(_0x547098,_0x4c1bca){if(_0x3773aa)return;_0x1966d6[_0x5a9a('0x15')](this,_0x547098,_0x4c1bca);};const _0x390ef7=Window_Options[_0x5a9a('0x53')][_0x5a9a('0x5')];Window_Options['prototype'][_0x5a9a('0x5')]=function(){if(_0x1d9908)this[_0x5a9a('0xc')]('按钮[退出后修改方向键]',_0x5a9a('0x37'));_0x390ef7[_0x5a9a('0x15')](this);};const _0x23c8ac=Window_Options[_0x5a9a('0x53')]['isVolumeSymbol'];Window_Options['prototype']['isVolumeSymbol']=function(_0x140fc4){return _0x23c8ac[_0x5a9a('0x15')](this,_0x140fc4)||_0x140fc4==_0x5a9a('0x37');};const _0x193e0a=Window_Options[_0x5a9a('0x53')]['cursorRight'];Window_Options['prototype']['cursorRight']=function(_0x18150b){var _0x334682=this['index']();var _0xe1828b=this['commandSymbol'](_0x334682);if(_0xe1828b==_0x5a9a('0x37')){var _0x19f4e0=this['getConfigValue'](_0xe1828b);_0x19f4e0+=0xa;_0x19f4e0=_0x19f4e0[_0x5a9a('0x39')](0x0,0xc8);this['changeValue'](_0xe1828b,_0x19f4e0);}else _0x193e0a[_0x5a9a('0x15')](this,_0x18150b);};const _0x19fe21=Window_Options['prototype']['cursorLeft'];Window_Options['prototype']['cursorLeft']=function(_0x46ccf4){var _0x24fd19=this[_0x5a9a('0x25')]();var _0x3a7f02=this['commandSymbol'](_0x24fd19);if(_0x3a7f02==_0x5a9a('0x37')){var _0x49e67c=this['getConfigValue'](_0x3a7f02);_0x49e67c-=0xa;_0x49e67c=_0x49e67c[_0x5a9a('0x39')](0x0,0xc8);this['changeValue'](_0x3a7f02,_0x49e67c);}else _0x19fe21[_0x5a9a('0x15')](this,_0x46ccf4);};const _0x2f09b0=Window_Options['prototype'][_0x5a9a('0x4e')];Window_Options[_0x5a9a('0x53')]['processOk']=function(){var _0x33f3b=this[_0x5a9a('0x25')]();var _0x24a595=this['commandSymbol'](_0x33f3b);if(_0x24a595==_0x5a9a('0x37')){var _0x24db6b=this[_0x5a9a('0x38')](_0x24a595);_0x24db6b+=0x1;_0x24db6b=_0x24db6b['clamp'](0x0,0xc8);this['changeValue'](_0x24a595,_0x24db6b);}else _0x2f09b0[_0x5a9a('0x15')](this);};const _0x5a3540=Window_Options['prototype']['changeValue'];Window_Options['prototype'][_0x5a9a('0x2a')]=function(_0x4960f6,_0x4a75e8){if(_0x4960f6=='NBButtonSize'){setRealZoom(_0x4a75e8/0x64,0x1);this['refresh']();}else _0x5a3540['call'](this,_0x4960f6,_0x4a75e8);};const _0x1d7120=Window_Options['prototype'][_0x5a9a('0x38')];Window_Options['prototype'][_0x5a9a('0x38')]=function(_0x6a8158){if(_0x6a8158=='NBButtonSize')return Math['floor'](NBRealZoom*0x64);else return _0x1d7120[_0x5a9a('0x15')](this,_0x6a8158);};const _0x5ca49b=Scene_Options[_0x5a9a('0x53')][_0x5a9a('0x4a')];Scene_Options[_0x5a9a('0x53')][_0x5a9a('0x4a')]=function(){setRealZoom(-0x1,0x0);_0x5ca49b[_0x5a9a('0x15')](this);};getName=(_0x1d14db,_0x86336d)=>{return'./img/button/'+(_0x86336d?_0x1d14db['name']:_0x1d14db['namex'])+'.png';};loadImage=function(_0x674f45,_0x1281a6){let _0x245c4b=new Image();_0x245c4b['src']=getName(_0x674f45,_0x1281a6);_0x245c4b['onload']=()=>{if(_0x1281a6){_0x674f45[_0x5a9a('0x23')]=_0x245c4b[_0x5a9a('0x23')];_0x674f45['height']=_0x245c4b['height'];}else{_0x674f45['widthx']=_0x245c4b[_0x5a9a('0x23')];_0x674f45['heightx']=_0x245c4b[_0x5a9a('0x60')];}};return _0x245c4b;};(()=>{_0x34be37['push'](_0x1ab2c3);for(var _0x4cbd6a of _0x29eb04)_0x34be37['push'](JsonEx[_0x5a9a('0x7')](_0x4cbd6a));for(var _0x4cbd6a of _0x34be37){if(_0x4cbd6a['name'])loadImage(_0x4cbd6a,!![]);if(_0x4cbd6a['namex'])loadImage(_0x4cbd6a,![]);}})();loadDiv=function(_0x4f6282,_0x35f89f){let _0x3d0093=document[_0x5a9a('0x12')]('div');_0x3d0093['id']='NBButton'+_0x4f6282['id']+(_0x35f89f?'':'o');_0x3d0093['style'][_0x5a9a('0x61')]='fixed';var _0xe1960e=Math['floor']((_0x35f89f?_0x4f6282[_0x5a9a('0x23')]:_0x4f6282['widthx'])*_0x4f6282['scale']/0x64*NBRealZoom);var _0x7cc60d=Math['floor']((_0x35f89f?_0x4f6282[_0x5a9a('0x60')]:_0x4f6282['heightx']/0x2)*_0x4f6282[_0x5a9a('0x14')]/0x64*NBRealZoom);_0x3d0093['style']['width']=_0xe1960e+'px';_0x3d0093[_0x5a9a('0x1e')][_0x5a9a('0x60')]=_0x7cc60d+'px';_0x3d0093[_0x5a9a('0x1e')]['top']=dealTextContent(_0x4f6282['y'],_0x35f89f,_0x4f6282,_0xe1960e,_0x7cc60d)+'px';_0x3d0093['style'][_0x5a9a('0x27')]=dealTextContent(_0x4f6282['x'],_0x35f89f,_0x4f6282,_0xe1960e,_0x7cc60d)+'px';_0x3d0093[_0x5a9a('0x1e')]['opacity']=_0x4f6282[_0x5a9a('0x1a')]/0xff;_0x3d0093['style']['zIndex']='11';_0x3d0093[_0x5a9a('0x1e')][_0x5a9a('0xd')]='none';_0x3d0093[_0x5a9a('0x1e')]['-webkit-tap-highlight-color']='rgba(0,0,0,0)';_0x3d0093['style'][_0x5a9a('0x62')]='url('+getName(_0x4f6282,_0x35f89f)+')';_0x3d0093['style']['background-repeat']='no-repeat';_0x3d0093['style']['background-size']=_0xe1960e+_0x5a9a('0x33')+(_0x35f89f?_0x7cc60d:_0x7cc60d*0x2)+'px';_0x3d0093[_0x5a9a('0x1e')]['background-position']='-0px\x20-'+0x0+'px';document['body'][_0x5a9a('0x50')](_0x3d0093);return _0x3d0093;};canJudge=()=>{return!SceneManager[_0x5a9a('0x2d')]();};dealTextContent=(_0x519544,_0xc61f98,_0xc18e8e,_0xec87a,_0x391ba8)=>{_0x519544=String(_0x519544);_0x519544=_0x519544['replace'](/bw/ig,_0xec87a);_0x519544=_0x519544[_0x5a9a('0x44')](/bh/ig,_0x391ba8);_0x519544=_0x519544[_0x5a9a('0x44')](/sw/ig,Graphics[_0x5a9a('0x23')]);_0x519544=_0x519544[_0x5a9a('0x44')](/sh/ig,Graphics['height']);_0x519544=_0x519544[_0x5a9a('0x44')](/w/ig,window['innerWidth']);_0x519544=_0x519544['replace'](/h/ig,window['innerHeight']);_0x519544=_0x519544['replace'](/sx/ig,(window[_0x5a9a('0x28')]-Graphics[_0x5a9a('0x23')])/0x2);_0x519544=_0x519544['replace'](/sy/ig,(window['innerHeight']-Graphics['height'])/0x2);return eval(_0x519544);};function _0x21a96e(){this[_0x5a9a('0x3a')]['apply'](this,arguments);}_0x21a96e[_0x5a9a('0x53')]['initialize']=function(_0x38af75){this[_0x5a9a('0x5c')]=_0x38af75;let _0x3dbfb8=_0x38af75[_0x5a9a('0x57')][_0x5a9a('0x3')]('|');for(let _0x101327 of _0x3dbfb8)this[_0x5a9a('0x5c')]['showOn'+_0x101327]=!![];this['Div']=loadDiv(_0x38af75,!![]);this[_0x5a9a('0x2e')]=loadDiv(_0x38af75,![]);this['Press']=![];this[_0x5a9a('0x11')]=![];this['show']=null;this[_0x5a9a('0x5b')]();this[_0x5a9a('0x20')]();var _0x50fb5a=this;if(!Utils['isMobileDevice']()&&_0x34cab0){this[_0x5a9a('0x30')]['addEventListener']('mousedown',_0x1faef8=>{var _0x505ad7=_0x1faef8[_0x5a9a('0x5a')],_0x30449f=_0x1faef8['clientY'];var _0x4e9346=_0x505ad7-this['x']-this[_0x5a9a('0x23')]/0x2,_0x219adb=_0x30449f-this['y']-this['height']/0x2,_0x3267f3=(this['height']+this['width'])/0x4;if(_0x4e9346*_0x4e9346+_0x219adb*_0x219adb>_0x3267f3*_0x3267f3)return;if(canJudge()){_0x50fb5a[_0x5a9a('0x1d')](_0x505ad7,_0x30449f);_0x50fb5a[_0x5a9a('0x1c')]=!![];};if(this['Data'][_0x5a9a('0x4b')]=='pressed')this['runData']();},![]);this['DivX']['addEventListener']('mousedown',_0x3faa0c=>{if(canJudge()){_0x50fb5a['setInput'](_0x3faa0c['clientX'],_0x3faa0c['clientY']);_0x50fb5a['Press']=!![];};if(this[_0x5a9a('0x5c')]['type']=='pressed')this[_0x5a9a('0x42')]();},![]);this['DivX'][_0x5a9a('0x54')]('mousemove',_0x11a9c3=>{if(_0x50fb5a['Press']&&canJudge())_0x50fb5a[_0x5a9a('0x1d')](_0x11a9c3[_0x5a9a('0x5a')],_0x11a9c3['clientY']);},![]);this['DivX']['addEventListener']('mouseup',()=>{_0x50fb5a['clearInput']();_0x50fb5a['Press']=![];if(this['Data'][_0x5a9a('0x4b')]=='triggered')this[_0x5a9a('0x42')]();},![]);this[_0x5a9a('0x2e')]['addEventListener'](_0x5a9a('0x5f'),()=>{_0x50fb5a[_0x5a9a('0x20')]();_0x50fb5a[_0x5a9a('0x1c')]=![];},![]);}this['Div'][_0x5a9a('0x54')](_0x5a9a('0x65'),_0x20cd3d=>{var _0x3185eb=_0x20cd3d['targetTouches'][0x0]['clientX'],_0x2867d6=_0x20cd3d['targetTouches'][0x0]['clientY'];var _0x527618=_0x3185eb-this['x']-this[_0x5a9a('0x23')]/0x2,_0x181e3b=_0x2867d6-this['y']-this['height']/0x2,_0x5f0fde=(this[_0x5a9a('0x60')]+this['width'])/0x4;if(_0x527618*_0x527618+_0x181e3b*_0x181e3b>_0x5f0fde*_0x5f0fde)return;if(canJudge()){_0x50fb5a[_0x5a9a('0x1d')](_0x3185eb,_0x2867d6);_0x50fb5a[_0x5a9a('0x1c')]=!![];};if(this['Data'][_0x5a9a('0x4b')]=='pressed')this['runData']();},![]);this['Div']['addEventListener'](_0x5a9a('0x6'),_0x4000e4=>{_0x50fb5a[_0x5a9a('0x20')]();_0x50fb5a['Press']=![];if(this['Data']['type']=='triggered')this['runData']();},![]);this[_0x5a9a('0x30')][_0x5a9a('0x54')](_0x5a9a('0x2b'),_0x2fb174=>{if(_0x50fb5a[_0x5a9a('0x1c')]&&canJudge()){_0x50fb5a[_0x5a9a('0x1d')](_0x2fb174['targetTouches'][0x0][_0x5a9a('0x5a')],_0x2fb174['targetTouches'][0x0]['clientY']);};},![]);this[_0x5a9a('0x2e')]['addEventListener'](_0x5a9a('0x65'),_0xf6744a=>{if(canJudge()){_0x50fb5a[_0x5a9a('0x1d')](_0xf6744a[_0x5a9a('0x4d')][0x0]['clientX'],_0xf6744a[_0x5a9a('0x4d')][0x0]['clientY']);_0x50fb5a['Press']=!![];};if(this[_0x5a9a('0x5c')][_0x5a9a('0x4b')]=='pressed')this['runData']();},![]);this['DivX'][_0x5a9a('0x54')](_0x5a9a('0x2b'),_0x11cfc7=>{if(_0x50fb5a['Press']&&canJudge()){_0x50fb5a['setInput'](_0x11cfc7[_0x5a9a('0x4d')][0x0]['clientX'],_0x11cfc7[_0x5a9a('0x4d')][0x0][_0x5a9a('0x10')]);};},![]);this[_0x5a9a('0x2e')]['addEventListener']('touchend',()=>{_0x50fb5a[_0x5a9a('0x20')]();_0x50fb5a['Press']=![];if(this[_0x5a9a('0x5c')][_0x5a9a('0x4b')]=='triggered')this['runData']();},![]);};_0x21a96e['prototype']['refreshData']=function(){this['x']=Number(this['Div']['style']['left'][_0x5a9a('0x18')](0x0,this['Div']['style']['left']['length']-0x2));this['y']=Number(this[_0x5a9a('0x30')]['style'][_0x5a9a('0x66')]['substr'](0x0,this['Div'][_0x5a9a('0x1e')]['top'][_0x5a9a('0x1f')]-0x2));this['xx']=Number(this[_0x5a9a('0x2e')][_0x5a9a('0x1e')][_0x5a9a('0x27')][_0x5a9a('0x18')](0x0,this[_0x5a9a('0x2e')]['style'][_0x5a9a('0x27')]['length']-0x2));this['yx']=Number(this['DivX'][_0x5a9a('0x1e')]['top']['substr'](0x0,this['DivX']['style']['top'][_0x5a9a('0x1f')]-0x2));this['width']=Number(this[_0x5a9a('0x30')]['style'][_0x5a9a('0x23')][_0x5a9a('0x18')](0x0,this[_0x5a9a('0x30')][_0x5a9a('0x1e')][_0x5a9a('0x23')][_0x5a9a('0x1f')]-0x2));this['height']=Number(this['Div']['style']['height'][_0x5a9a('0x18')](0x0,this[_0x5a9a('0x30')][_0x5a9a('0x1e')]['height']['length']-0x2));this[_0x5a9a('0x17')]=Number(this[_0x5a9a('0x2e')]['style']['width'][_0x5a9a('0x18')](0x0,this['DivX']['style'][_0x5a9a('0x23')]['length']-0x2));this[_0x5a9a('0x36')]=Number(this[_0x5a9a('0x2e')]['style'][_0x5a9a('0x23')][_0x5a9a('0x18')](0x0,this['DivX']['style']['width']['length']-0x2));let _0x5d7d60=$gameVariables[_0x5a9a('0x3f')](this['Data']['id'])||{};_0x5d7d60[_0x5a9a('0x14')]=this[_0x5a9a('0x5c')][_0x5a9a('0x14')];_0x5d7d60['x']=this[_0x5a9a('0x5c')]['x'];_0x5d7d60['y']=this['Data']['y'];_0x5d7d60['opacity']=this[_0x5a9a('0x5c')]['opacity'];$gameVariables[_0x5a9a('0x29')](this[_0x5a9a('0x5c')]['id'],_0x5d7d60);};_0x21a96e['prototype'][_0x5a9a('0x3d')]=function(){let _0x56eaef=$gameVariables['button'](this[_0x5a9a('0x5c')]['id']);if(!_0x56eaef)return;this['Data']['x']=_0x56eaef['x'];this['Data']['y']=_0x56eaef['y'];this['Data']['opacity']=_0x56eaef['opacity'];this[_0x5a9a('0x5c')]['scale']=_0x56eaef['scale'];this['refreshPosition']();};_0x21a96e['prototype'][_0x5a9a('0x42')]=function(){if(this[_0x5a9a('0x5c')]['commonevent']>0x0)$gameTemp[_0x5a9a('0x16')](this['Data'][_0x5a9a('0x64')]);if(this['Data']['script']['length']>0x0)eval(eval(this['Data'][_0x5a9a('0x3c')]));};_0x21a96e['prototype'][_0x5a9a('0x35')]=function(){if(this[_0x5a9a('0x1c')]!=this['PressAnim'])this['updateShow']();if(this[_0x5a9a('0x5d')]()!=this[_0x5a9a('0x32')]){this['show']=this[_0x5a9a('0x5d')]();if(this[_0x5a9a('0x32')]){this[_0x5a9a('0x2e')][_0x5a9a('0x1e')]['display']=_0x5a9a('0x52');this[_0x5a9a('0x30')]['style'][_0x5a9a('0x51')]=_0x5a9a('0x52');}else{this[_0x5a9a('0x2e')]['style']['display']='none';this[_0x5a9a('0x30')][_0x5a9a('0x1e')]['display']=_0x5a9a('0x49');}this[_0x5a9a('0x1c')]=![];this[_0x5a9a('0x2c')]();}};_0x21a96e['prototype'][_0x5a9a('0x2c')]=function(){this['PressAnim']=this['Press'];if(this[_0x5a9a('0x1c')])this[_0x5a9a('0x2e')][_0x5a9a('0x1e')][_0x5a9a('0x1')]=_0x5a9a('0x8')+this['DivX'][_0x5a9a('0x1e')]['height'];else this['DivX']['style']['background-position']='-0px\x20-'+0x0+'px';};_0x21a96e['prototype'][_0x5a9a('0x5d')]=function(){if(this[_0x5a9a('0x5c')][_0x5a9a('0x3e')]['length']>0x0){if(eval(this[_0x5a9a('0x5c')][_0x5a9a('0x3e')]))return!![];}let _0x4635fd=SceneManager['_scene']?!!eval(this['Data']['showOn'+SceneManager['_scene'][_0x5a9a('0x26')]['name'][_0x5a9a('0xa')]()]):![];if(_0x4635fd)return!![];if(this[_0x5a9a('0x5c')]['switch']>0x0)return $gameSwitches[_0x5a9a('0x47')](this[_0x5a9a('0x5c')][_0x5a9a('0x9')]);return![];};_0x21a96e['prototype']['setInput']=function(_0x49376a,_0x9b7732){this['xx']=_0x49376a-this['widthx']/0x2;this['yx']=_0x9b7732-this['heightx']/0x2;this[_0x5a9a('0x2e')][_0x5a9a('0x1e')][_0x5a9a('0x27')]=this['xx']+'px';this['DivX'][_0x5a9a('0x1e')][_0x5a9a('0x66')]=this['yx']+'px';this['touchx']=_0x49376a-this['x']-this[_0x5a9a('0x23')]/0x2;this[_0x5a9a('0x24')]=_0x9b7732-this['y']-this[_0x5a9a('0x60')]/0x2;if(this['touchx']>Math[_0x5a9a('0x58')](this['touchy'])*0x1){Input[_0x5a9a('0x34')][_0x5a9a('0x5e')]=!![];Input['_currentState'][_0x5a9a('0x27')]=![];}else if(this[_0x5a9a('0xf')]<-Math[_0x5a9a('0x58')](this[_0x5a9a('0x24')])*0x1){Input[_0x5a9a('0x34')]['left']=!![];Input[_0x5a9a('0x34')]['right']=![];}else{Input[_0x5a9a('0x34')][_0x5a9a('0x27')]=![];Input[_0x5a9a('0x34')][_0x5a9a('0x5e')]=![];}if(this['touchy']>Math[_0x5a9a('0x58')](this[_0x5a9a('0xf')])*0x1){Input[_0x5a9a('0x34')][_0x5a9a('0x43')]=!![];Input['_currentState']['up']=![];}else if(this['touchy']<-Math[_0x5a9a('0x58')](this[_0x5a9a('0xf')])*0x1){Input[_0x5a9a('0x34')]['up']=!![];Input['_currentState']['down']=![];}else{Input['_currentState']['up']=![];Input['_currentState'][_0x5a9a('0x43')]=![];}};_0x21a96e['prototype']['clearInput']=function(){this[_0x5a9a('0xf')]=0x0;this['touchy']=0x0;Input['_currentState']['up']=![];Input[_0x5a9a('0x34')]['down']=![];Input[_0x5a9a('0x34')]['left']=![];Input[_0x5a9a('0x34')][_0x5a9a('0x5e')]=![];this[_0x5a9a('0x2e')][_0x5a9a('0x1e')][_0x5a9a('0x27')]=this['x']+this[_0x5a9a('0x23')]/0x2-this[_0x5a9a('0x17')]/0x2+'px';this[_0x5a9a('0x2e')]['style']['top']=this['y']+this['height']/0x2-this['heightx']/0x2+'px';};_0x21a96e['prototype'][_0x5a9a('0x59')]=function(){if(!![]){let _0x1a8290=!![],_0x53a1ef=this['Data'],_0x42d9c7=this['Div'];let _0x2c6afd=Math[_0x5a9a('0x2f')]((_0x1a8290?_0x53a1ef[_0x5a9a('0x23')]:_0x53a1ef[_0x5a9a('0x17')])*_0x53a1ef[_0x5a9a('0x14')]/0x64*NBRealZoom);let _0x20bb60=Math['floor']((_0x1a8290?_0x53a1ef['height']:_0x53a1ef['heightx']/0x2)*_0x53a1ef['scale']/0x64*NBRealZoom);_0x42d9c7[_0x5a9a('0x1e')]['width']=_0x2c6afd+'px';_0x42d9c7[_0x5a9a('0x1e')]['height']=_0x20bb60+'px';_0x42d9c7[_0x5a9a('0x1e')][_0x5a9a('0x66')]=dealTextContent(_0x53a1ef['y'],_0x1a8290,_0x53a1ef,_0x2c6afd,_0x20bb60)+'px';_0x42d9c7[_0x5a9a('0x1e')]['left']=dealTextContent(_0x53a1ef['x'],_0x1a8290,_0x53a1ef,_0x2c6afd,_0x20bb60)+'px';_0x42d9c7['style'][_0x5a9a('0x4c')]=_0x2c6afd+'px\x20'+(_0x1a8290?_0x20bb60:_0x20bb60*0x2)+'px';_0x42d9c7['style'][_0x5a9a('0x1a')]=this[_0x5a9a('0x5c')]['opacity']/0xff;}if(!![]){let _0x28bca3=![],_0xc335f8=this['Data'],_0x2c2818=this['DivX'];let _0xdd9f39=Math['floor']((_0x28bca3?_0xc335f8['width']:_0xc335f8['widthx'])*_0xc335f8[_0x5a9a('0x14')]/0x64*NBRealZoom);let _0x34d09a=Math['floor']((_0x28bca3?_0xc335f8['height']:_0xc335f8[_0x5a9a('0x36')]/0x2)*_0xc335f8['scale']/0x64*NBRealZoom);_0x2c2818['style']['width']=_0xdd9f39+'px';_0x2c2818['style'][_0x5a9a('0x60')]=_0x34d09a+'px';_0x2c2818[_0x5a9a('0x1e')][_0x5a9a('0x66')]=Number(this['Div'][_0x5a9a('0x1e')][_0x5a9a('0x66')]['substr'](0x0,this['Div'][_0x5a9a('0x1e')][_0x5a9a('0x66')]['length']-0x2))+Number(this['Div']['style'][_0x5a9a('0x60')]['substr'](0x0,this['Div'][_0x5a9a('0x1e')]['height'][_0x5a9a('0x1f')]-0x2))/0x2-_0xdd9f39/0x2+'px';_0x2c2818['style'][_0x5a9a('0x27')]=Number(this['Div']['style']['left'][_0x5a9a('0x18')](0x0,this[_0x5a9a('0x30')]['style'][_0x5a9a('0x27')][_0x5a9a('0x1f')]-0x2))+Number(this['Div'][_0x5a9a('0x1e')]['width']['substr'](0x0,this[_0x5a9a('0x30')]['style']['width'][_0x5a9a('0x1f')]-0x2))/0x2-_0x34d09a/0x2+'px';_0x2c2818[_0x5a9a('0x1e')][_0x5a9a('0x4c')]=_0xdd9f39+_0x5a9a('0x33')+(_0x28bca3?_0x34d09a:_0x34d09a*0x2)+'px';_0x2c2818[_0x5a9a('0x1e')][_0x5a9a('0x1a')]=this[_0x5a9a('0x5c')][_0x5a9a('0x1a')]/0xff;}this['refreshData']();};_0x21a96e[_0x5a9a('0x53')]['resetData']=function(_0x451c91,_0x57e6ca,_0x4075a4,_0xbbcc92){this['Data'][_0x5a9a('0x14')]=_0x451c91;this[_0x5a9a('0x5c')]['x']=_0x57e6ca;this['Data']['y']=_0x4075a4;this['Data']['opacity']=_0xbbcc92;this['refreshPosition']();};function _0x5e9ace(){this[_0x5a9a('0x3a')][_0x5a9a('0x31')](this,arguments);}_0x5e9ace[_0x5a9a('0x53')][_0x5a9a('0x3a')]=function(_0x47f42a){this[_0x5a9a('0x13')]=![];this[_0x5a9a('0x5c')]=_0x47f42a;let _0x37d4a0=_0x47f42a['showOn']['split']('|');for(let _0x408546 of _0x37d4a0)this[_0x5a9a('0x5c')][_0x5a9a('0x57')+_0x408546]=!![];this[_0x5a9a('0x30')]=loadDiv(_0x47f42a,![]);this[_0x5a9a('0x1c')]=![];this['PressAnim']=![];this['show']=null;this['refreshData']();this['clearInput']();var _0x1294fd=this;if(!Utils[_0x5a9a('0x1b')]()&&_0x34cab0){this[_0x5a9a('0x30')]['addEventListener'](_0x5a9a('0x56'),_0x1e3f00=>{if(this[_0x5a9a('0x5c')][_0x5a9a('0x4b')]==_0x5a9a('0x4'))this['runData']();if(canJudge()){_0x1294fd[_0x5a9a('0x1d')]();_0x1294fd[_0x5a9a('0x1c')]=!![];};},![]);this[_0x5a9a('0x30')][_0x5a9a('0x54')](_0x5a9a('0x45'),()=>{if(this[_0x5a9a('0x5c')][_0x5a9a('0x4b')]=='triggered')this[_0x5a9a('0x42')]();_0x1294fd[_0x5a9a('0x20')]();_0x1294fd[_0x5a9a('0x1c')]=![];},![]);this[_0x5a9a('0x30')][_0x5a9a('0x54')](_0x5a9a('0x21'),()=>{if(this[_0x5a9a('0x5c')]['type']=='triggered')this['runData']();_0x1294fd['clearInput']();_0x1294fd[_0x5a9a('0x1c')]=![];},![]);}this[_0x5a9a('0x30')][_0x5a9a('0x54')]('touchstart',_0xb969de=>{if(this['Data'][_0x5a9a('0x4b')]==_0x5a9a('0x4'))this[_0x5a9a('0x42')]();if(canJudge()){_0x1294fd[_0x5a9a('0x1d')]();_0x1294fd[_0x5a9a('0x1c')]=!![];};},![]);this[_0x5a9a('0x30')]['addEventListener']('touchend',()=>{if(this[_0x5a9a('0x5c')][_0x5a9a('0x4b')]==_0x5a9a('0x41'))this['runData']();_0x1294fd['clearInput']();_0x1294fd['Press']=![];},![]);};_0x5e9ace[_0x5a9a('0x53')][_0x5a9a('0x5b')]=function(){this['x']=Number(this['Div'][_0x5a9a('0x1e')]['left']['substr'](0x0,this[_0x5a9a('0x30')]['style']['left']['length']-0x2));this['y']=Number(this[_0x5a9a('0x30')][_0x5a9a('0x1e')]['top']['substr'](0x0,this['Div']['style']['top']['length']-0x2));this[_0x5a9a('0x23')]=Number(this['Div']['style'][_0x5a9a('0x23')]['substr'](0x0,this[_0x5a9a('0x30')][_0x5a9a('0x1e')][_0x5a9a('0x23')]['length']-0x2));this['height']=Number(this[_0x5a9a('0x30')]['style']['height'][_0x5a9a('0x18')](0x0,this[_0x5a9a('0x30')][_0x5a9a('0x1e')]['height']['length']-0x2));let _0x671589=$gameVariables['button'](this[_0x5a9a('0x5c')]['id'])||{};_0x671589[_0x5a9a('0x14')]=this['Data']['scale'];_0x671589['x']=this[_0x5a9a('0x5c')]['x'];_0x671589['y']=this[_0x5a9a('0x5c')]['y'];_0x671589[_0x5a9a('0x1a')]=this['Data'][_0x5a9a('0x1a')];$gameVariables['setButton'](this[_0x5a9a('0x5c')]['id'],_0x671589);};_0x5e9ace['prototype']['loadRemember']=function(){let _0x832c95=$gameVariables[_0x5a9a('0x3f')](this[_0x5a9a('0x5c')]['id']);if(!_0x832c95)return;this[_0x5a9a('0x5c')]['x']=_0x832c95['x'];this[_0x5a9a('0x5c')]['y']=_0x832c95['y'];this[_0x5a9a('0x5c')][_0x5a9a('0x1a')]=_0x832c95['opacity'];this[_0x5a9a('0x5c')][_0x5a9a('0x14')]=_0x832c95['scale'];this[_0x5a9a('0x59')]();};_0x5e9ace['prototype']['runData']=function(){if(SceneManager['_scene']['constructor']['name']!='Scene_Map')return;if(this['Data']['commonevent']>0x0)$gameTemp['reserveCommonEvent'](this['Data'][_0x5a9a('0x64')]);if(this['Data']['script']['length']>0x0)eval(eval(this[_0x5a9a('0x5c')][_0x5a9a('0x3c')]));};_0x5e9ace['prototype'][_0x5a9a('0x35')]=function(){if(this['Press']!=this['PressAnim'])this[_0x5a9a('0x2c')]();if(this['judge']()!=this['show']){this[_0x5a9a('0x32')]=this[_0x5a9a('0x5d')]();if(this[_0x5a9a('0x32')])this[_0x5a9a('0x30')]['style'][_0x5a9a('0x51')]=_0x5a9a('0x52');else this[_0x5a9a('0x30')][_0x5a9a('0x1e')][_0x5a9a('0x51')]='none';this[_0x5a9a('0x1c')]=![];this['updateShow']();}};_0x5e9ace[_0x5a9a('0x53')]['updateShow']=function(){this[_0x5a9a('0x11')]=this[_0x5a9a('0x1c')];if(this[_0x5a9a('0x1c')])this['Div'][_0x5a9a('0x1e')]['background-position']=_0x5a9a('0x8')+this[_0x5a9a('0x30')][_0x5a9a('0x1e')]['height'];else this['Div'][_0x5a9a('0x1e')]['background-position']='-0px\x20-'+0x0+'px';};_0x5e9ace['prototype'][_0x5a9a('0x5d')]=function(){if(this[_0x5a9a('0x5c')][_0x5a9a('0x3e')]['length']>0x0){if(eval(this[_0x5a9a('0x5c')][_0x5a9a('0x3e')]))return!![];}let _0x4337b2=SceneManager[_0x5a9a('0x0')]?!!eval(this['Data']['showOn'+SceneManager[_0x5a9a('0x0')]['constructor']['name']['toString']()]):![];if(_0x4337b2)return!![];if(this[_0x5a9a('0x5c')][_0x5a9a('0x9')]>0x0)return $gameSwitches['value'](this['Data'][_0x5a9a('0x9')]);return![];};_0x5e9ace[_0x5a9a('0x53')]['setInput']=function(){if(this['Data']['button']['length']>0x0)Input['_currentState'][this['Data']['button']]=!![];};_0x5e9ace['prototype'][_0x5a9a('0x20')]=function(){if(this[_0x5a9a('0x5c')][_0x5a9a('0x3f')][_0x5a9a('0x1f')]>0x0)Input['_currentState'][this[_0x5a9a('0x5c')]['button']]=![];};_0x5e9ace['prototype'][_0x5a9a('0x59')]=function(){var _0x3a6d12=![],_0xd42cd0=this[_0x5a9a('0x5c')],_0x27237c=this['Div'];var _0x30647c=Math[_0x5a9a('0x2f')]((_0x3a6d12?_0xd42cd0[_0x5a9a('0x23')]:_0xd42cd0[_0x5a9a('0x17')])*_0xd42cd0['scale']/0x64*NBRealZoom);var _0x5d8c16=Math[_0x5a9a('0x2f')]((_0x3a6d12?_0xd42cd0['height']:_0xd42cd0['heightx']/0x2)*_0xd42cd0[_0x5a9a('0x14')]/0x64*NBRealZoom);_0x27237c[_0x5a9a('0x1e')]['width']=_0x30647c+'px';_0x27237c['style'][_0x5a9a('0x60')]=_0x5d8c16+'px';_0x27237c[_0x5a9a('0x1e')][_0x5a9a('0x66')]=dealTextContent(_0xd42cd0['y'],_0x3a6d12,_0xd42cd0,_0x30647c,_0x5d8c16)+'px';_0x27237c['style'][_0x5a9a('0x27')]=dealTextContent(_0xd42cd0['x'],_0x3a6d12,_0xd42cd0,_0x30647c,_0x5d8c16)+'px';_0x27237c[_0x5a9a('0x1e')]['background-size']=_0x30647c+'px\x20'+(_0x3a6d12?_0x5d8c16:_0x5d8c16*0x2)+'px';_0x27237c[_0x5a9a('0x1e')][_0x5a9a('0x1a')]=this[_0x5a9a('0x5c')][_0x5a9a('0x1a')]/0xff;this[_0x5a9a('0x5b')]();};_0x5e9ace[_0x5a9a('0x53')][_0x5a9a('0x4f')]=function(_0x112fe5,_0x512c5c,_0x2f5ddf,_0x128a63){this[_0x5a9a('0x5c')][_0x5a9a('0x14')]=_0x112fe5;this['Data']['x']=_0x512c5c;this['Data']['y']=_0x2f5ddf;this[_0x5a9a('0x5c')]['opacity']=_0x128a63;this['refreshPosition']();};let _0x3e68da=![];const _0x57f8dd=Scene_Boot['prototype'][_0x5a9a('0x55')];Scene_Boot[_0x5a9a('0x53')][_0x5a9a('0x55')]=function(){_0x57f8dd[_0x5a9a('0x15')](this);if(!_0x3bb7c7)return;if(_0x3e68da)return;_0x3e68da=!![];document[_0x5a9a('0x63')]('ErrorPrinter')['style']['pointer-events']=_0x5a9a('0x49');NBButtonList[_0x5a9a('0x48')](new _0x21a96e(_0x34be37[0x0]));for(let _0x1acfee=0x1;_0x1acfee<_0x34be37[_0x5a9a('0x1f')];_0x1acfee++)NBButtonList[_0x5a9a('0x48')](new _0x5e9ace(_0x34be37[_0x1acfee]));document[_0x5a9a('0x67')][_0x5a9a('0x1e')]['-webkit-user-select']='none';document[_0x5a9a('0x54')]('touchmove',function(_0x306f6f){_0x306f6f['preventDefault']();},![]);};const _0x1c852c=Scene_Base[_0x5a9a('0x53')]['update'];Scene_Base[_0x5a9a('0x53')]['update']=function(){_0x1c852c['call'](this);for(var _0x494ed2 of NBButtonList)_0x494ed2[_0x5a9a('0x35')]();};const _0x2090b3=Scene_Map['prototype'][_0x5a9a('0x35')];Scene_Map['prototype'][_0x5a9a('0x35')]=function(){_0x2090b3['call'](this);if(QJ['B'][_0x5a9a('0x22')]){QJ['B']['remember']=![];if($gameVariables[_0x5a9a('0x2')])setRealZoom($gameVariables[_0x5a9a('0x2')],0x0);for(let _0x4d0f50 of NBButtonList){_0x4d0f50['loadRemember']();}}};})();
//=============================================================================
//
//=============================================================================
