import { createWidget, widget, align, prop, text_style, event } from '@zos/ui';

Page({
  build() {
    // 创建显示输入内容的文本控件
    createWidget(widget.FILL_RECT, {
      x: 10,
      y: 198,
      w: 460,
      h: 36,
      radius: 15,
      color: 0x6b6b6b
    });

    const displayText = createWidget(widget.TEXT, {
      x: 68,
      y: 78,
      w: 350,
      h: 100,
      text_size: 32,
      align_h:align.CENTER_H	,
      text_style: text_style.WRAP,
      text: '',
      color: 0xffffff,
    });

    let inputText = ''; // 用于存储输入内容
    let candidateWords = []; // 候选词数组
    let currentInput = ''; // 当前输入的拼音

    // 中文词库，使用拼音作为键
    const chineseDictionary = { "a": "阿啊呵腌嗄吖锕", "e": "额阿俄恶鹅遏鄂厄饿峨扼娥鳄哦蛾噩愕讹锷垩婀鹗萼谔莪腭锇颚呃阏屙苊轭", "ai": "爱埃艾碍癌哀挨矮隘蔼唉皑哎霭捱暧嫒嗳瑷嗌锿砹", "ei": "诶", "xi": "系西席息希习吸喜细析戏洗悉锡溪惜稀袭夕洒晰昔牺腊烯熙媳栖膝隙犀蹊硒兮熄曦禧嬉玺奚汐徙羲铣淅嘻歙熹矽蟋郗唏皙隰樨浠忾蜥檄郄翕阋鳃舾屣葸螅咭粞觋欷僖醯鼷裼穸饩舄禊诶菥蓰", "yi": "易一以已意议义益亿医艺食依移衣异伊仪宜射遗疑毅谊亦疫役忆抑尾乙译翼蛇溢椅沂泄逸蚁夷邑怡绎彝裔姨熠贻矣屹颐倚诣胰奕翌疙弈轶蛾驿壹猗臆弋铱旖漪迤佚翊诒怿痍懿饴峄揖眙镒仡黟肄咿翳挹缢呓刈咦嶷羿钇殪荑薏蜴镱噫癔苡悒嗌瘗衤佾埸圯舣酏劓", "an": "安案按岸暗鞍氨俺胺铵谙庵黯鹌桉埯犴揞厂广", "han": "厂汉韩含旱寒汗涵函喊憾罕焊翰邯撼瀚憨捍酣悍鼾邗颔蚶晗菡旰顸犴焓撖", "ang": "昂仰盎肮", "ao": "奥澳傲熬凹鳌敖遨鏖袄坳翱嗷拗懊岙螯骜獒鏊艹媪廒聱", "wa": "瓦挖娃洼袜蛙凹哇佤娲呙腽", "yu": "于与育余预域予遇奥语誉玉鱼雨渔裕愈娱欲吁舆宇羽逾豫郁寓吾狱喻御浴愉禹俞邪榆愚渝尉淤虞屿峪粥驭瑜禺毓钰隅芋熨瘀迂煜昱汩於臾盂聿竽萸妪腴圄谕觎揄龉谀俣馀庾妤瘐鬻欤鹬阈嵛雩鹆圉蜮伛纡窬窳饫蓣狳肀舁蝓燠", "niu": "牛纽扭钮拗妞忸狃", "o": "哦噢喔", "ba": "把八巴拔伯吧坝爸霸罢芭跋扒叭靶疤笆耙鲅粑岜灞钯捌菝魃茇", "pa": "怕帕爬扒趴琶啪葩耙杷钯筢", "pi": "被批副否皮坏辟啤匹披疲罢僻毗坯脾譬劈媲屁琵邳裨痞癖陂丕枇噼霹吡纰砒铍淠郫埤濞睥芘蚍圮鼙罴蜱疋貔仳庀擗甓陴", "bi": "比必币笔毕秘避闭佛辟壁弊彼逼碧鼻臂蔽拂泌璧庇痹毙弼匕鄙陛裨贲敝蓖吡篦纰俾铋毖筚荸薜婢哔跸濞秕荜愎睥妣芘箅髀畀滗狴萆嬖襞舭", "bai": "百白败摆伯拜柏佰掰呗擘捭稗", "baifenhao": "％", "bo": "波博播勃拨薄佛伯玻搏柏泊舶剥渤卜驳簿脖膊簸菠礴箔铂亳钵帛擘饽跛钹趵檗啵鹁擗踣", "bei": "北被备倍背杯勃贝辈悲碑臂卑悖惫蓓陂钡狈呗焙碚褙庳鞴孛鹎邶鐾", "ban": "办版半班般板颁伴搬斑扮拌扳瓣坂阪绊钣瘢舨癍", "pan": "判盘番潘攀盼拚畔胖叛拌蹒磐爿蟠泮袢襻丬", "bin": "份宾频滨斌彬濒殡缤鬓槟摈膑玢镔豳髌傧", "bang": "帮邦彭旁榜棒膀镑绑傍磅蚌谤梆浜蒡", "pang": "旁庞乓磅螃彷滂逄耪", "beng": "泵崩蚌蹦迸绷甭嘣甏堋", "bao": "报保包宝暴胞薄爆炮饱抱堡剥鲍曝葆瀑豹刨褒雹孢苞煲褓趵鸨龅勹", "bu": "不部步布补捕堡埔卜埠簿哺怖钚卟瓿逋晡醭钸", "pu": "普暴铺浦朴堡葡谱埔扑仆蒲曝瀑溥莆圃璞濮菩蹼匍噗氆攵镨攴镤", "mian": "面棉免绵缅勉眠冕娩腼渑湎沔黾宀眄", "po": "破繁坡迫颇朴泊婆泼魄粕鄱珀陂叵笸泺皤钋钷", "fan": "反范犯繁饭泛翻凡返番贩烦拚帆樊藩矾梵蕃钒幡畈蘩蹯燔", "fu": "府服副负富复福夫妇幅付扶父符附腐赴佛浮覆辅傅伏抚赋辐腹弗肤阜袱缚甫氟斧孚敷俯拂俘咐腑孵芙涪釜脯茯馥宓绂讣呋罘麸蝠匐芾蜉跗凫滏蝮驸绋蚨砩桴赙菔呒趺苻拊阝鲋怫稃郛莩幞祓艴黻黼鳆", "ben": "本体奔苯笨夯贲锛畚坌", "feng": "风丰封峰奉凤锋冯逢缝蜂枫疯讽烽俸沣酆砜葑唪", "bian": "变便边编遍辩鞭辨贬匾扁卞汴辫砭苄蝙鳊弁窆笾煸褊碥忭缏", "pian": "便片篇偏骗翩扁骈胼蹁谝犏缏", "zhen": "镇真针圳振震珍阵诊填侦臻贞枕桢赈祯帧甄斟缜箴疹砧榛鸩轸稹溱蓁胗椹朕畛浈", "biao": "表标彪镖裱飚膘飙镳婊骠飑杓髟鳔灬瘭", "piao": "票朴漂飘嫖瓢剽缥殍瞟骠嘌莩螵", "huo": "和活或货获火伙惑霍祸豁嚯藿锪蠖钬耠镬夥灬劐攉", "bie": "别鳖憋瘪蹩", "min": "民敏闽闵皿泯岷悯珉抿黾缗玟愍苠鳘", "fen": "分份纷奋粉氛芬愤粪坟汾焚酚吩忿棼玢鼢瀵偾鲼", "bing": "并病兵冰屏饼炳秉丙摒柄槟禀枋邴冫", "geng": "更耕颈庚耿梗埂羹哽赓绠鲠", "fang": "方放房防访纺芳仿坊妨肪邡舫彷枋鲂匚钫", "xian": "显现先县见线限险献鲜洗宪纤陷闲贤仙衔掀咸嫌掺羡弦腺痫娴舷馅酰铣冼涎暹籼锨苋蚬跹岘藓燹鹇氙莶霰跣猃彡祆筅", "fou": "不否缶", "ca": "拆擦嚓礤", "cha": "查察差茶插叉刹茬楂岔诧碴嚓喳姹杈汊衩搽槎镲苴檫馇锸猹", "cai": "才采财材菜彩裁蔡猜踩睬", "can": "参残餐灿惨蚕掺璨惭粲孱骖黪", "shen": "信深参身神什审申甚沈伸慎渗肾绅莘呻婶娠砷蜃哂椹葚吲糁渖诜谂矧胂", "cen": "参岑涔", "san": "三参散伞叁糁馓毵", "cang": "藏仓苍沧舱臧伧", "zang": "藏脏葬赃臧奘驵", "chen": "称陈沈沉晨琛臣尘辰衬趁忱郴宸谌碜嗔抻榇伧谶龀肜", "cao": "草操曹槽糙嘈漕螬艚屮", "ce": "策测册侧厕栅恻", "ze": "责则泽择侧咋啧仄箦赜笮舴昃迮帻", "zhai": "债择齐宅寨侧摘窄斋祭翟砦瘵哜", "dao": "到道导岛倒刀盗稻蹈悼捣叨祷焘氘纛刂帱忉", "ceng": "层曾蹭噌", "zha": "查扎炸诈闸渣咋乍榨楂札栅眨咤柞喳喋铡蚱吒怍砟揸痄哳齄", "chai": "差拆柴钗豺侪虿瘥", "ci": "次此差词辞刺瓷磁兹慈茨赐祠伺雌疵鹚糍呲粢", "zi": "资自子字齐咨滋仔姿紫兹孜淄籽梓鲻渍姊吱秭恣甾孳訾滓锱辎趑龇赀眦缁呲笫谘嵫髭茈粢觜耔", "cuo": "措错磋挫搓撮蹉锉厝嵯痤矬瘥脞鹾", "chan": "产单阐崭缠掺禅颤铲蝉搀潺蟾馋忏婵孱觇廛谄谗澶骣羼躔蒇冁", "shan": "山单善陕闪衫擅汕扇掺珊禅删膳缮赡鄯栅煽姗跚鳝嬗潸讪舢苫疝掸膻钐剡蟮芟埏彡骟", "zhan": "展战占站崭粘湛沾瞻颤詹斩盏辗绽毡栈蘸旃谵搌", "xin": "新心信辛欣薪馨鑫芯锌忻莘昕衅歆囟忄镡", "lian": "联连练廉炼脸莲恋链帘怜涟敛琏镰濂楝鲢殓潋裢裣臁奁莶蠊蔹", "chang": "场长厂常偿昌唱畅倡尝肠敞倘猖娼淌裳徜昶怅嫦菖鲳阊伥苌氅惝鬯", "zhang": "长张章障涨掌帐胀彰丈仗漳樟账杖璋嶂仉瘴蟑獐幛鄣嫜", "chao": "超朝潮炒钞抄巢吵剿绰嘲晁焯耖怊", "zhao": "着照招找召朝赵兆昭肇罩钊沼嘲爪诏濯啁棹笊", "zhou": "调州周洲舟骤轴昼宙粥皱肘咒帚胄绉纣妯啁诌繇碡籀酎荮", "che": "车彻撤尺扯澈掣坼砗屮", "ju": "车局据具举且居剧巨聚渠距句拒俱柜菊拘炬桔惧矩鞠驹锯踞咀瞿枸掬沮莒橘飓疽钜趄踽遽琚龃椐苣裾榘狙倨榉苴讵雎锔窭鞫犋屦醵", "cheng": "成程城承称盛抢乘诚呈净惩撑澄秤橙骋逞瞠丞晟铛埕塍蛏柽铖酲裎枨", "rong": "容荣融绒溶蓉熔戎榕茸冗嵘肜狨蝾", "sheng": "生声升胜盛乘圣剩牲甸省绳笙甥嵊晟渑眚", "deng": "等登邓灯澄凳瞪蹬噔磴嶝镫簦戥", "zhi": "制之治质职只志至指织支值知识直致执置止植纸拓智殖秩旨址滞氏枝芝脂帜汁肢挚稚酯掷峙炙栉侄芷窒咫吱趾痔蜘郅桎雉祉郦陟痣蛭帙枳踯徵胝栀贽祗豸鸷摭轵卮轾彘觯絷跖埴夂黹忮骘膣踬", "zheng": "政正证争整征郑丁症挣蒸睁铮筝拯峥怔诤狰徵钲", "tang": "堂唐糖汤塘躺趟倘棠烫淌膛搪镗傥螳溏帑羰樘醣螗耥铴瑭", "chi": "持吃池迟赤驰尺斥齿翅匙痴耻炽侈弛叱啻坻眙嗤墀哧茌豉敕笞饬踟蚩柢媸魑篪褫彳鸱螭瘛眵傺", "shi": "是时实事市十使世施式势视识师史示石食始士失适试什泽室似诗饰殖释驶氏硕逝湿蚀狮誓拾尸匙仕柿矢峙侍噬嗜栅拭嘘屎恃轼虱耆舐莳铈谥炻豕鲥饣螫酾筮埘弑礻蓍鲺贳", "qi": "企其起期气七器汽奇齐启旗棋妻弃揭枝歧欺骑契迄亟漆戚岂稽岐琦栖缉琪泣乞砌祁崎绮祺祈凄淇杞脐麒圻憩芪伎俟畦耆葺沏萋骐鳍綦讫蕲屺颀亓碛柒啐汔綮萁嘁蛴槭欹芑桤丌蜞", "chuai": "揣踹啜搋膪", "tuo": "托脱拓拖妥驼陀沱鸵驮唾椭坨佗砣跎庹柁橐乇铊沲酡鼍箨柝", "duo": "多度夺朵躲铎隋咄堕舵垛惰哆踱跺掇剁柁缍沲裰哚隳", "xue": "学血雪削薛穴靴谑噱鳕踅泶彐", "chong": "重种充冲涌崇虫宠忡憧舂茺铳艟", "chou": "筹抽绸酬愁丑臭仇畴稠瞅踌惆俦瘳雠帱", "qiu": "求球秋丘邱仇酋裘龟囚遒鳅虬蚯泅楸湫犰逑巯艽俅蝤赇鼽糗", "xiu": "修秀休宿袖绣臭朽锈羞嗅岫溴庥馐咻髹鸺貅", "chu": "出处础初助除储畜触楚厨雏矗橱锄滁躇怵绌搐刍蜍黜杵蹰亍樗憷楮", "tuan": "团揣湍疃抟彖", "zhui": "追坠缀揣椎锥赘惴隹骓缒", "chuan": "传川船穿串喘椽舛钏遄氚巛舡", "zhuan": "专转传赚砖撰篆馔啭颛", "yuan": "元员院原源远愿园援圆缘袁怨渊苑宛冤媛猿垣沅塬垸鸳辕鸢瑗圜爰芫鼋橼螈眢箢掾", "cuan": "窜攒篡蹿撺爨汆镩", "chuang": "创床窗闯幢疮怆", "zhuang": "装状庄壮撞妆幢桩奘僮戆", "chui": "吹垂锤炊椎陲槌捶棰", "chun": "春纯醇淳唇椿蠢鹑朐莼肫蝽", "zhun": "准屯淳谆肫窀", "cu": "促趋趣粗簇醋卒蹴猝蹙蔟殂徂", "dun": "吨顿盾敦蹲墩囤沌钝炖盹遁趸砘礅", "qu": "区去取曲趋渠趣驱屈躯衢娶祛瞿岖龋觑朐蛐癯蛆苣阒诎劬蕖蘧氍黢蠼璩麴鸲磲", "xu": "需许续须序徐休蓄畜虚吁绪叙旭邪恤墟栩絮圩婿戌胥嘘浒煦酗诩朐盱蓿溆洫顼勖糈砉醑", "chuo": "辍绰戳淖啜龊踔辶", "zu": "组族足祖租阻卒俎诅镞菹", "ji": "济机其技基记计系期际及集级几给积极己纪即继击既激绩急奇吉季齐疾迹鸡剂辑籍寄挤圾冀亟寂暨脊跻肌稽忌饥祭缉棘矶汲畸姬藉瘠骥羁妓讥稷蓟悸嫉岌叽伎鲫诘楫荠戟箕霁嵇觊麂畿玑笈犄芨唧屐髻戢佶偈笄跽蒺乩咭赍嵴虮掎齑殛鲚剞洎丌墼蕺彐芰哜", "cong": "从丛匆聪葱囱琮淙枞骢苁璁", "zong": "总从综宗纵踪棕粽鬃偬枞腙", "cou": "凑辏腠楱", "cui": "衰催崔脆翠萃粹摧璀瘁悴淬啐隹毳榱", "wei": "为位委未维卫围违威伟危味微唯谓伪慰尾魏韦胃畏帷喂巍萎蔚纬潍尉渭惟薇苇炜圩娓诿玮崴桅偎逶倭猥囗葳隗痿猬涠嵬韪煨艉隹帏闱洧沩隈鲔軎", "cun": "村存寸忖皴", "zuo": "作做座左坐昨佐琢撮祚柞唑嘬酢怍笮阼胙", "zuan": "钻纂攥缵躜", "da": "大达打答搭沓瘩惮嗒哒耷鞑靼褡笪怛妲", "dai": "大代带待贷毒戴袋歹呆隶逮岱傣棣怠殆黛甙埭诒绐玳呔迨", "tai": "大台太态泰抬胎汰钛苔薹肽跆邰鲐酞骀炱", "ta": "他它她拓塔踏塌榻沓漯獭嗒挞蹋趿遢铊鳎溻闼", "dan": "但单石担丹胆旦弹蛋淡诞氮郸耽殚惮儋眈疸澹掸膻啖箪聃萏瘅赕", "lu": "路六陆录绿露鲁卢炉鹿禄赂芦庐碌麓颅泸卤潞鹭辘虏璐漉噜戮鲈掳橹轳逯渌蓼撸鸬栌氇胪镥簏舻辂垆", "tan": "谈探坦摊弹炭坛滩贪叹谭潭碳毯瘫檀痰袒坍覃忐昙郯澹钽锬", "ren": "人任认仁忍韧刃纫饪妊荏稔壬仞轫亻衽", "jie": "家结解价界接节她届介阶街借杰洁截姐揭捷劫戒皆竭桔诫楷秸睫藉拮芥诘碣嗟颉蚧孑婕疖桀讦疥偈羯袷哜喈卩鲒骱", "yan": "研严验演言眼烟沿延盐炎燕岩宴艳颜殷彦掩淹阎衍铅雁咽厌焰堰砚唁焉晏檐蜒奄俨腌妍谚兖筵焱偃闫嫣鄢湮赝胭琰滟阉魇酽郾恹崦芫剡鼹菸餍埏谳讠厣罨", "dang": "当党档荡挡宕砀铛裆凼菪谠", "tao": "套讨跳陶涛逃桃萄淘掏滔韬叨洮啕绦饕鼗", "tiao": "条调挑跳迢眺苕窕笤佻啁粜髫铫祧龆蜩鲦", "te": "特忑忒铽慝", "de": "的地得德底锝", "dei": "得", "di": "的地第提低底抵弟迪递帝敌堤蒂缔滴涤翟娣笛棣荻谛狄邸嘀砥坻诋嫡镝碲骶氐柢籴羝睇觌", "ti": "体提题弟替梯踢惕剔蹄棣啼屉剃涕锑倜悌逖嚏荑醍绨鹈缇裼", "tui": "推退弟腿褪颓蜕忒煺", "you": "有由又优游油友右邮尤忧幼犹诱悠幽佑釉柚铀鱿囿酉攸黝莠猷蝣疣呦蚴莸莜铕宥繇卣牖鼬尢蚰侑", "dian": "电点店典奠甸碘淀殿垫颠滇癫巅惦掂癜玷佃踮靛钿簟坫阽", "tian": "天田添填甜甸恬腆佃舔钿阗忝殄畋栝掭", "zhu": "主术住注助属逐宁著筑驻朱珠祝猪诸柱竹铸株瞩嘱贮煮烛苎褚蛛拄铢洙竺蛀渚伫杼侏澍诛茱箸炷躅翥潴邾槠舳橥丶瘃麈疰", "nian": "年念酿辗碾廿捻撵拈蔫鲶埝鲇辇黏", "diao": "调掉雕吊钓刁貂凋碉鲷叼铫铞", "yao": "要么约药邀摇耀腰遥姚窑瑶咬尧钥谣肴夭侥吆疟妖幺杳舀窕窈曜鹞爻繇徭轺铫鳐崾珧", "die": "跌叠蝶迭碟爹谍牒耋佚喋堞瓞鲽垤揲蹀", "she": "设社摄涉射折舍蛇拾舌奢慑赦赊佘麝歙畲厍猞揲滠", "ye": "业也夜叶射野液冶喝页爷耶邪咽椰烨掖拽曳晔谒腋噎揶靥邺铘揲", "xie": "些解协写血叶谢械鞋胁斜携懈契卸谐泄蟹邪歇泻屑挟燮榭蝎撷偕亵楔颉缬邂鲑瀣勰榍薤绁渫廨獬躞", "zhe": "这者着著浙折哲蔗遮辙辄柘锗褶蜇蛰鹧谪赭摺乇磔螫", "ding": "定订顶丁鼎盯钉锭叮仃铤町酊啶碇腚疔玎耵", "diu": "丢铥", "ting": "听庭停厅廷挺亭艇婷汀铤烃霆町蜓葶梃莛", "dong": "动东董冬洞懂冻栋侗咚峒氡恫胴硐垌鸫岽胨", "tong": "同通统童痛铜桶桐筒彤侗佟潼捅酮砼瞳恸峒仝嗵僮垌茼", "zhong": "中重种众终钟忠仲衷肿踵冢盅蚣忪锺舯螽夂", "dou": "都斗读豆抖兜陡逗窦渎蚪痘蔸钭篼", "du": "度都独督读毒渡杜堵赌睹肚镀渎笃竺嘟犊妒牍蠹椟黩芏髑", "duan": "断段短端锻缎煅椴簖", "dui": "对队追敦兑堆碓镦怼憝", "rui": "瑞兑锐睿芮蕊蕤蚋枘", "yue": "月说约越乐跃兑阅岳粤悦曰钥栎钺樾瀹龠哕刖", "tun": "吞屯囤褪豚臀饨暾氽", "hui": "会回挥汇惠辉恢徽绘毁慧灰贿卉悔秽溃荟晖彗讳诲珲堕诙蕙晦睢麾烩茴喙桧蛔洄浍虺恚蟪咴隳缋哕", "wu": "务物无五武午吴舞伍污乌误亡恶屋晤悟吾雾芜梧勿巫侮坞毋诬呜钨邬捂鹜兀婺妩於戊鹉浯蜈唔骛仵焐芴鋈庑鼯牾怃圬忤痦迕杌寤阢", "ya": "亚压雅牙押鸭呀轧涯崖邪芽哑讶鸦娅衙丫蚜碣垭伢氩桠琊揠吖睚痖疋迓岈砑", "he": "和合河何核盖贺喝赫荷盒鹤吓呵苛禾菏壑褐涸阂阖劾诃颌嗬貉曷翮纥盍", "wo": "我握窝沃卧挝涡斡渥幄蜗喔倭莴龌肟硪", "en": "恩摁蒽", "n": "嗯唔", "er": "而二尔儿耳迩饵洱贰铒珥佴鸸鲕", "fa": "发法罚乏伐阀筏砝垡珐", "quan": "全权券泉圈拳劝犬铨痊诠荃醛蜷颧绻犭筌鬈悛辁畎", "fei": "费非飞肥废菲肺啡沸匪斐蜚妃诽扉翡霏吠绯腓痱芾淝悱狒榧砩鲱篚镄", "pei": "配培坏赔佩陪沛裴胚妃霈淠旆帔呸醅辔锫", "ping": "平评凭瓶冯屏萍苹乒坪枰娉俜鲆", "fo": "佛", "hu": "和护许户核湖互乎呼胡戏忽虎沪糊壶葫狐蝴弧瑚浒鹄琥扈唬滹惚祜囫斛笏芴醐猢怙唿戽槲觳煳鹕冱瓠虍岵鹱烀轷", "ga": "夹咖嘎尬噶旮伽尕钆尜", "ge": "个合各革格歌哥盖隔割阁戈葛鸽搁胳舸疙铬骼蛤咯圪镉颌仡硌嗝鬲膈纥袼搿塥哿虼", "ha": "哈蛤铪", "xia": "下夏峡厦辖霞夹虾狭吓侠暇遐瞎匣瑕唬呷黠硖罅狎瘕柙", "gai": "改该盖概溉钙丐芥赅垓陔戤", "hai": "海还害孩亥咳骸骇氦嗨胲醢", "gan": "干感赶敢甘肝杆赣乾柑尴竿秆橄矸淦苷擀酐绀泔坩旰疳澉", "gang": "港钢刚岗纲冈杠缸扛肛罡戆筻", "jiang": "将强江港奖讲降疆蒋姜浆匠酱僵桨绛缰犟豇礓洚茳糨耩", "hang": "行航杭巷夯吭桁沆绗颃", "gong": "工公共供功红贡攻宫巩龚恭拱躬弓汞蚣珙觥肱廾", "hong": "红宏洪轰虹鸿弘哄烘泓訇蕻闳讧荭黉薨", "guang": "广光逛潢犷胱咣桄", "qiong": "穷琼穹邛茕筇跫蛩銎", "gao": "高告搞稿膏糕镐皋羔锆杲郜睾诰藁篙缟槁槔", "hao": "好号毫豪耗浩郝皓昊皋蒿壕灏嚎濠蚝貉颢嗥薅嚆", "li": "理力利立里李历例离励礼丽黎璃厉厘粒莉梨隶栗荔沥犁漓哩狸藜罹篱鲤砺吏澧俐骊溧砾莅锂笠蠡蛎痢雳俪傈醴栎郦俚枥喱逦娌鹂戾砬唳坜疠蜊黧猁鬲粝蓠呖跞疬缡鲡鳢嫠詈悝苈篥轹", "jia": "家加价假佳架甲嘉贾驾嫁夹稼钾挟拮迦伽颊浃枷戛荚痂颉镓笳珈岬胛袈郏葭袷瘕铗跏蛱恝哿", "luo": "落罗络洛逻螺锣骆萝裸漯烙摞骡咯箩珞捋荦硌雒椤镙跞瘰泺脶猡倮蠃", "ke": "可科克客刻课颗渴壳柯棵呵坷恪苛咳磕珂稞瞌溘轲窠嗑疴蝌岢铪颏髁蚵缂氪骒钶锞", "qia": "卡恰洽掐髂袷咭葜", "gei": "给", "gen": "根跟亘艮哏茛", "hen": "很狠恨痕哏", "gou": "构购够句沟狗钩拘勾苟垢枸篝佝媾诟岣彀缑笱鞲觏遘", "kou": "口扣寇叩抠佝蔻芤眍筘", "gu": "股古顾故固鼓骨估谷贾姑孤雇辜菇沽咕呱锢钴箍汩梏痼崮轱鸪牯蛊诂毂鹘菰罟嘏臌觚瞽蛄酤牿鲴", "pai": "牌排派拍迫徘湃俳哌蒎", "gua": "括挂瓜刮寡卦呱褂剐胍诖鸹栝呙", "tou": "投头透偷愉骰亠", "guai": "怪拐乖", "kuai": "会快块筷脍蒯侩浍郐蒉狯哙", "guan": "关管观馆官贯冠惯灌罐莞纶棺斡矜倌鹳鳏盥掼涫", "wan": "万完晚湾玩碗顽挽弯蔓丸莞皖宛婉腕蜿惋烷琬畹豌剜纨绾脘菀芄箢", "ne": "呢哪呐讷疒", "gui": "规贵归轨桂柜圭鬼硅瑰跪龟匮闺诡癸鳜桧皈鲑刽晷傀眭妫炅庋簋刿宄匦", "jun": "军均俊君峻菌竣钧骏龟浚隽郡筠皲麇捃", "jiong": "窘炯迥炅冂扃", "jue": "决绝角觉掘崛诀獗抉爵嚼倔厥蕨攫珏矍蹶谲镢鳜噱桷噘撅橛孓觖劂爝", "gun": "滚棍辊衮磙鲧绲丨", "hun": "婚混魂浑昏棍珲荤馄诨溷阍", "guo": "国过果郭锅裹帼涡椁囗蝈虢聒埚掴猓崞蜾呙馘", "hei": "黑嘿嗨", "kan": "看刊勘堪坎砍侃嵌槛瞰阚龛戡凵莰", "heng": "衡横恒亨哼珩桁蘅", "mo": "万没么模末冒莫摩墨默磨摸漠脉膜魔沫陌抹寞蘑摹蓦馍茉嘿谟秣蟆貉嫫镆殁耱嬷麽瘼貊貘", "peng": "鹏朋彭膨蓬碰苹棚捧亨烹篷澎抨硼怦砰嘭蟛堋", "hou": "后候厚侯猴喉吼逅篌糇骺後鲎瘊堠", "hua": "化华划话花画滑哗豁骅桦猾铧砉", "huai": "怀坏淮徊槐踝", "huan": "还环换欢患缓唤焕幻痪桓寰涣宦垸洹浣豢奂郇圜獾鲩鬟萑逭漶锾缳擐", "xun": "讯训迅孙寻询循旬巡汛勋逊熏徇浚殉驯鲟薰荀浔洵峋埙巽郇醺恂荨窨蕈曛獯", "huang": "黄荒煌皇凰慌晃潢谎惶簧璜恍幌湟蝗磺隍徨遑肓篁鳇蟥癀", "nai": "能乃奶耐奈鼐萘氖柰佴艿", "luan": "乱卵滦峦鸾栾銮挛孪脔娈", "qie": "切且契窃茄砌锲怯伽惬妾趄挈郄箧慊", "jian": "建间件见坚检健监减简艰践兼鉴键渐柬剑尖肩舰荐箭浅剪俭碱茧奸歼拣捡煎贱溅槛涧堑笺谏饯锏缄睑謇蹇腱菅翦戬毽笕犍硷鞯牮枧湔鲣囝裥踺搛缣鹣蒹谫僭戋趼楗", "nan": "南难男楠喃囡赧腩囝蝻", "qian": "钱前千签潜迁欠纤牵浅遣谦乾铅歉黔谴嵌倩钳茜虔堑钎骞阡掮钤扦芊犍荨仟芡悭缱佥愆褰凵肷岍搴箝慊椠", "qiang": "强抢疆墙枪腔锵呛羌蔷襁羟跄樯戕嫱戗炝镪锖蜣", "xiang": "向项相想乡象响香降像享箱羊祥湘详橡巷翔襄厢镶飨饷缃骧芗庠鲞葙蟓", "jiao": "教交较校角觉叫脚缴胶轿郊焦骄浇椒礁佼蕉娇矫搅绞酵剿嚼饺窖跤蛟侥狡姣皎茭峤铰醮鲛湫徼鹪僬噍艽挢敫", "zhuo": "着著缴桌卓捉琢灼浊酌拙茁涿镯淖啄濯焯倬擢斫棹诼浞禚", "qiao": "桥乔侨巧悄敲俏壳雀瞧翘窍峭锹撬荞跷樵憔鞘橇峤诮谯愀鞒硗劁缲", "xiao": "小效销消校晓笑肖削孝萧俏潇硝宵啸嚣霄淆哮筱逍姣箫骁枭哓绡蛸崤枵魈", "si": "司四思斯食私死似丝饲寺肆撕泗伺嗣祀厮驷嘶锶俟巳蛳咝耜笥纟糸鸶缌澌姒汜厶兕", "kai": "开凯慨岂楷恺揩锴铠忾垲剀锎蒈", "jin": "进金今近仅紧尽津斤禁锦劲晋谨筋巾浸襟靳瑾烬缙钅矜觐堇馑荩噤廑妗槿赆衿卺", "qin": "亲勤侵秦钦琴禽芹沁寝擒覃噙矜嗪揿溱芩衾廑锓吣檎螓", "jing": "经京精境竞景警竟井惊径静劲敬净镜睛晶颈荆兢靖泾憬鲸茎腈菁胫阱旌粳靓痉箐儆迳婧肼刭弪獍", "ying": "应营影英景迎映硬盈赢颖婴鹰荧莹樱瑛蝇萦莺颍膺缨瀛楹罂荥萤鹦滢蓥郢茔嘤璎嬴瘿媵撄潆", "jiu": "就究九酒久救旧纠舅灸疚揪咎韭玖臼柩赳鸠鹫厩啾阄桕僦鬏", "zui": "最罪嘴醉咀蕞觜", "juan": "卷捐圈眷娟倦绢隽镌涓鹃鄄蠲狷锩桊", "suan": "算酸蒜狻", "yun": "员运云允孕蕴韵酝耘晕匀芸陨纭郧筠恽韫郓氲殒愠昀菀狁", "qun": "群裙逡麇", "ka": "卡喀咖咔咯佧胩", "kang": "康抗扛慷炕亢糠伉钪闶", "keng": "坑铿吭", "kao": "考靠烤拷铐栲尻犒", "ken": "肯垦恳啃龈裉", "yin": "因引银印音饮阴隐姻殷淫尹荫吟瘾寅茵圻垠鄞湮蚓氤胤龈窨喑铟洇狺夤廴吲霪茚堙", "kong": "空控孔恐倥崆箜", "ku": "苦库哭酷裤枯窟挎骷堀绔刳喾", "kua": "跨夸垮挎胯侉", "kui": "亏奎愧魁馈溃匮葵窥盔逵睽馗聩喟夔篑岿喹揆隗傀暌跬蒉愦悝蝰", "kuan": "款宽髋", "kuang": "况矿框狂旷眶匡筐邝圹哐贶夼诳诓纩", "que": "确却缺雀鹊阙瘸榷炔阕悫", "kun": "困昆坤捆琨锟鲲醌髡悃阃", "kuo": "扩括阔廓蛞", "la": "拉落垃腊啦辣蜡喇剌旯砬邋瘌", "lai": "来莱赖睐徕籁涞赉濑癞崃疠铼", "lan": "兰览蓝篮栏岚烂滥缆揽澜拦懒榄斓婪阑褴罱啉谰镧漤", "lin": "林临邻赁琳磷淋麟霖鳞凛拎遴蔺吝粼嶙躏廪檩啉辚膦瞵懔", "lang": "浪朗郎廊狼琅榔螂阆锒莨啷蒗稂", "liang": "量两粮良辆亮梁凉谅粱晾靓踉莨椋魉墚", "lao": "老劳落络牢捞涝烙姥佬崂唠酪潦痨醪铑铹栳耢", "mu": "目模木亩幕母牧莫穆姆墓慕牟牡募睦缪沐暮拇姥钼苜仫毪坶", "le": "了乐勒肋叻鳓嘞仂泐", "lei": "类累雷勒泪蕾垒磊擂镭肋羸耒儡嫘缧酹嘞诔檑", "sui": "随岁虽碎尿隧遂髓穗绥隋邃睢祟濉燧谇眭荽", "lie": "列烈劣裂猎冽咧趔洌鬣埒捩躐", "leng": "冷愣棱楞塄", "ling": "领令另零灵龄陵岭凌玲铃菱棱伶羚苓聆翎泠瓴囹绫呤棂蛉酃鲮柃", "lia": "俩", "liao": "了料疗辽廖聊寥缪僚燎缭撂撩嘹潦镣寮蓼獠钌尥鹩", "liu": "流刘六留柳瘤硫溜碌浏榴琉馏遛鎏骝绺镏旒熘鹨锍", "lun": "论轮伦仑纶沦抡囵", "lv": "率律旅绿虑履吕铝屡氯缕滤侣驴榈闾偻褛捋膂稆", "lou": "楼露漏陋娄搂篓喽镂偻瘘髅耧蝼嵝蒌", "mao": "贸毛矛冒貌茂茅帽猫髦锚懋袤牦卯铆耄峁瑁蟊茆蝥旄泖昴瞀", "long": "龙隆弄垄笼拢聋陇胧珑窿茏咙砻垅泷栊癃", "nong": "农浓弄脓侬哝", "shuang": "双爽霜孀泷", "shu": "术书数属树输束述署朱熟殊蔬舒疏鼠淑叔暑枢墅俞曙抒竖蜀薯梳戍恕孰沭赎庶漱塾倏澍纾姝菽黍腧秫毹殳疋摅", "shuai": "率衰帅摔甩蟀", "lve": "略掠锊", "ma": "么马吗摩麻码妈玛嘛骂抹蚂唛蟆犸杩", "me": "么麽", "mai": "买卖麦迈脉埋霾荬劢", "man": "满慢曼漫埋蔓瞒蛮鳗馒幔谩螨熳缦镘颟墁鞔", "mi": "米密秘迷弥蜜谜觅靡泌眯麋猕谧咪糜宓汨醚嘧弭脒冖幂祢縻蘼芈糸敉", "men": "们门闷瞒汶扪焖懑鞔钔", "mang": "忙盲茫芒氓莽蟒邙硭漭", "meng": "蒙盟梦猛孟萌氓朦锰檬勐懵蟒蜢虻黾蠓艨甍艋瞢礞", "miao": "苗秒妙描庙瞄缪渺淼藐缈邈鹋杪眇喵", "mou": "某谋牟缪眸哞鍪蛑侔厶", "miu": "缪谬", "mei": "美没每煤梅媒枚妹眉魅霉昧媚玫酶镁湄寐莓袂楣糜嵋镅浼猸鹛", "wen": "文问闻稳温纹吻蚊雯紊瘟汶韫刎璺玟阌", "mie": "灭蔑篾乜咩蠛", "ming": "明名命鸣铭冥茗溟酩瞑螟暝", "na": "内南那纳拿哪娜钠呐捺衲镎肭", "nei": "内那哪馁", "nuo": "难诺挪娜糯懦傩喏搦锘", "ruo": "若弱偌箬", "nang": "囊馕囔曩攮", "nao": "脑闹恼挠瑙淖孬垴铙桡呶硇猱蛲", "ni": "你尼呢泥疑拟逆倪妮腻匿霓溺旎昵坭铌鲵伲怩睨猊", "nen": "嫩恁", "neng": "能", "nin": "您恁", "niao": "鸟尿溺袅脲茑嬲", "nie": "摄聂捏涅镍孽捻蘖啮蹑嗫臬镊颞乜陧", "niang": "娘酿", "ning": "宁凝拧泞柠咛狞佞聍甯", "nu": "努怒奴弩驽帑孥胬", "nv": "女钕衄恧", "ru": "入如女乳儒辱汝茹褥孺濡蠕嚅缛溽铷洳薷襦颥蓐", "nuan": "暖", "nve": "虐疟", "re": "热若惹喏", "ou": "区欧偶殴呕禺藕讴鸥瓯沤耦怄", "pao": "跑炮泡抛刨袍咆疱庖狍匏脬", "pou": "剖掊裒", "pen": "喷盆湓", "pie": "瞥撇苤氕丿", "pin": "品贫聘频拼拚颦姘嫔榀牝", "se": "色塞瑟涩啬穑铯槭", "qing": "情青清请亲轻庆倾顷卿晴氢擎氰罄磬蜻箐鲭綮苘黥圊檠謦", "zan": "赞暂攒堑昝簪糌瓒錾趱拶", "shao": "少绍召烧稍邵哨韶捎勺梢鞘芍苕劭艄筲杓潲", "sao": "扫骚嫂梢缫搔瘙臊埽缲鳋", "sha": "沙厦杀纱砂啥莎刹杉傻煞鲨霎嗄痧裟挲铩唼歃", "xuan": "县选宣券旋悬轩喧玄绚渲璇炫萱癣漩眩暄煊铉楦泫谖痃碹揎镟儇", "ran": "然染燃冉苒髯蚺", "rang": "让壤攘嚷瓤穰禳", "rao": "绕扰饶娆桡荛", "reng": "仍扔", "ri": "日", "rou": "肉柔揉糅鞣蹂", "ruan": "软阮朊", "run": "润闰", "sa": "萨洒撒飒卅仨脎", "suo": "所些索缩锁莎梭琐嗦唆唢娑蓑羧挲桫嗍睃", "sai": "思赛塞腮噻鳃", "shui": "说水税谁睡氵", "sang": "桑丧嗓搡颡磉", "sen": "森", "seng": "僧", "shai": "筛晒", "shang": "上商尚伤赏汤裳墒晌垧觞殇熵绱", "xing": "行省星腥猩惺兴刑型形邢饧醒幸杏性姓陉荇荥擤悻硎", "shou": "收手受首售授守寿瘦兽狩绶艏扌", "shuo": "说数硕烁朔铄妁槊蒴搠", "su": "速素苏诉缩塑肃俗宿粟溯酥夙愫簌稣僳谡涑蔌嗉觫", "shua": "刷耍唰", "shuan": "栓拴涮闩", "shun": "顺瞬舜吮", "song": "送松宋讼颂耸诵嵩淞怂悚崧凇忪竦菘", "sou": "艘搜擞嗽嗖叟馊薮飕嗾溲锼螋瞍", "sun": "损孙笋荪榫隼狲飧", "teng": "腾疼藤滕誊", "tie": "铁贴帖餮萜", "tu": "土突图途徒涂吐屠兔秃凸荼钍菟堍酴", "wai": "外歪崴", "wang": "王望往网忘亡旺汪枉妄惘罔辋魍", "weng": "翁嗡瓮蓊蕹", "zhua": "抓挝爪", "yang": "样养央阳洋扬杨羊详氧仰秧痒漾疡泱殃恙鸯徉佯怏炀烊鞅蛘", "xiong": "雄兄熊胸凶匈汹芎", "yo": "哟唷", "yong": "用永拥勇涌泳庸俑踊佣咏雍甬镛臃邕蛹恿慵壅痈鳙墉饔喁", "za": "杂扎咱砸咋匝咂拶", "zai": "在再灾载栽仔宰哉崽甾", "zao": "造早遭枣噪灶燥糟凿躁藻皂澡蚤唣", "zei": "贼", "zen": "怎谮", "zeng": "增曾综赠憎锃甑罾缯", "zhei": "这", "zou": "走邹奏揍诹驺陬楱鄹鲰", "zhuai": "转拽", "zun": "尊遵鳟樽撙", "dia": "嗲", "nou": "耨", "qxk": "钱显康蔡徐坤", "cnm": "钱显康", "cxk": "蔡徐坤钱显康", "shei": "谁", "jntm": "鸡你太美" };


    // 创建字母按钮并添加点击事件处理函数
    const buttons = [
      { x: 10, y: 235, text: 'Q' },
      { x: 57, y: 235, text: 'W' },
      { x: 104, y: 235, text: 'E' },
      { x: 151, y: 235, text: 'R' },
      { x: 198, y: 235, text: 'T' },
      { x: 243, y: 235, text: 'Y' },
      { x: 290, y: 235, text: 'U' },
      { x: 337, y: 235, text: 'I' },
      { x: 384, y: 235, text: 'O' },
      { x: 431, y: 235, text: 'P' },
      { x: 35, y: 298, text: 'A' },
      { x: 82, y: 298, text: 'S' },
      { x: 129, y: 298, text: 'D' },
      { x: 174, y: 298, text: 'F' },
      { x: 221, y: 298, text: 'G' },
      { x: 268, y: 298, text: 'H' },
      { x: 315, y: 298, text: 'J' },
      { x: 362, y: 298, text: 'K' },
      { x: 409, y: 298, text: 'L' },
      { x: 82, y: 362, text: 'Z' },
      { x: 128, y: 362, text: 'X' },
      { x: 174, y: 362, text: 'C' },
      { x: 220, y: 362, text: 'V' },
      { x: 268, y: 362, text: 'B' },
      { x: 315, y: 362, text: 'N' },
      { x: 362, y: 362, text: 'M' }
    ];


    // 创建空格按钮
    createWidget(widget.BUTTON, {
      x: 190,
      y: 420,
      w: 110,
      h: 50,
      radius: 17,
      normal_color: 0x202124,
      press_color: 0x6b6b6b,
      text: ' ',
      click_func: (button_widget) => {
        if (currentInput) {
          if (chineseDictionary[currentInput]) {
            inputText += chineseDictionary[currentInput][0]; // 添加默认候选词到输入内容
          } else {
            inputText += '[' + currentInput + ']'; // 添加当前输入的拼音到输入内容
          }
          currentInput = ''; // 清空当前输入的拼音
        } else {
          inputText += ' '; // 添加空格到输入内容
        }
        displayText.setProperty(prop.TEXT, inputText); // 更新文本控件的内容
        updateCandidateDisplay(); // 更新候选词显示
      }
    });

    // 创建候选词显示区域
    const candidateTextWidgets = [];
    for (let i = 0; i < 6; i++) {
      candidateTextWidgets.push(createWidget(widget.TEXT, {
        x: 19 + i * 45,
        y: 200,
        w: 50,
        h: 50,
        text_size: 24,
        text: '',
        color: 0xffffff,
      }))
      candidateTextWidgets[i].addEventListener(event.CLICK_UP, () => {
        if (i < candidateWords.length) {
          inputText += candidateWords[i]; // 添加候选词到输入内容
          currentInput = ''; // 清空当前输入的拼音
          displayText.setProperty(prop.TEXT, inputText); // 更新文本控件的内容
          updateCandidateDisplay(); // 更新候选词显示
        }
      });
    }

    // 更新候选词显示
    function updateCandidateDisplay() {
      for (let i = 0; i < 6; i++) {
        if (i < candidateWords.length) {
          candidateTextWidgets[i].setProperty(prop.TEXT, candidateWords[i]); // 显示候选词
        } else {
          candidateTextWidgets[i].setProperty(prop.TEXT, ''); // 清空多余的候选词显示
        }
      }
    }

    // 初始更新候选词显示
    updateCandidateDisplay();

   /*  const img_bkg = createWidget(widget.BUTTON, {
      x: 305,
      y: 420,
      text: '123',
      w: 50,
      h: 50,
      radius: 17,
      normal_color: 0x3fa7fe,
      press_color: 0x1a73d5,
    });
    img_bkg.addEventListener(event.CLICK_DOWN, function (info) {
      // 控件注册事件监听
      console.log(info.x);
      switchUI(false);
    }); */
    let isEnglishMode = false; // 用于存储当前是否为英文输入模式

    // 创建切换输入模式按钮
    createWidget(widget.BUTTON, {
      x: 305,
      y: 420,
      text: '中/英',
      w: 50,
      h: 50,
      radius: 17,
      /* normal_color: 0x3fa7fe,
      press_color: 0x1a73d5, */
    }).addEventListener(event.CLICK_DOWN, function (info) {
      isEnglishMode = !isEnglishMode; // 切换输入模式
      displayText.setProperty(prop.TEXT, inputText); // 更新文本控件的内容
    });

    // 修改字母按钮的点击事件处理函数
    const enjp = createWidget(widget.GROUP, {
      x: 0,
      y: 0,
      w: 400,
      h: 500,
    });
    const buttonWidgets = buttons.map(button => {//26键盘按钮控件
      return enjp.createWidget(widget.BUTTON, {
        x: button.x,
        y: button.y,
        w: 40,
        h: 50,
        radius: 17,
        normal_color: 0x202124,//6b6b6b
        press_color: 0x6b6b6b,
        text: button.text,
        text_size: 29,
        click_func: (button_widget) => {
          if (isEnglishMode) {
            inputText += button.text; // 直接添加英文到输入内容
            displayText.setProperty(prop.TEXT, inputText); // 更新文本控件的内容
          } else {
            currentInput += button.text.toLowerCase(); // 更新当前输入的拼音
            displayText.setProperty(prop.TEXT, inputText + '[' + currentInput + ']'); // 更新文本控件的内容

            // 获取候选词
            if (chineseDictionary[currentInput]) {
              candidateWords = chineseDictionary[currentInput]; // 获取候选词
              updateCandidateDisplay(); // 更新候选词显示
            }
          }
        }
      });
    });

    // 修改删除键的点击事件处理函数
    createWidget(widget.BUTTON, {
      x: 385,
      y: 146,
      text: '←',
      w: 70,
      h: 50,
      radius: 17,
      normal_color: 0x3fa7fe,
      press_color: 0x1a73d5,
    }).addEventListener(event.CLICK_DOWN, function (info) {
      if (isEnglishMode) {
        if (inputText) {
          // 如果当前是英文模式，删除输入内容中的最后一个字符
          inputText = inputText.slice(0, -1);
          displayText.setProperty(prop.TEXT, inputText); // 更新文本控件的内容
        }
      } else {
        if (currentInput) {
          // 如果当前有输入的拼音，删除最后一个字母
          currentInput = currentInput.slice(0, -1);
          if (currentInput) {
            displayText.setProperty(prop.TEXT, inputText + '[' + currentInput + ']'); // 更新文本控件的内容
            // 如果还有剩余的拼音，更新候选词显示
            if (chineseDictionary[currentInput]) {
              candidateWords = chineseDictionary[currentInput]; // 获取候选词
              updateCandidateDisplay(); // 更新候选词显示
            }
          } else {
            // 如果没有剩余的拼音，删除括号
            displayText.setProperty(prop.TEXT, inputText); // 更新文本控件的内容
            candidateWords = [];
            updateCandidateDisplay(); // 更新候选词显示
          }
        } else if (inputText) {
          // 如果当前没有输入的拼音，删除输入内容中的最后一个字符
          if (inputText.endsWith(']') && inputText.includes('[')) {
            // 如果最后一个字符是右括号，且包含左括号，删除整个括号
            const lastBracketIndex = inputText.lastIndexOf('[');
            inputText = inputText.slice(0, lastBracketIndex);
          } else {
            // 否则删除最后一个字符
            inputText = inputText.slice(0, -1);
          }
          displayText.setProperty(prop.TEXT, inputText); // 更新文本控件的内容
        }
      }
    });

    //txtBg.setProperty(prop.VISIBLE, false);
    let txtGroup = createWidget(widget.GROUP, {
      x: 0,
      y: 0,
      w: 192,
      h: 490
    });
    txtGroup.createWidget(widget.FILL_RECT, { // 自定义组件容器
      x: 10,
      y: 198,
      w: 460,
      h: 220,
      color: 0x00000
    });
    /* function switchUI(b) {
      img_bkg.setProperty(prop.VISIBLE, b);
      txtBg.setProperty(prop.VISIBLE, !b);
      txtGroup.setProperty(prop.VISIBLE, !b);
      buttonWidgets.forEach(widget => widget.setProperty(prop.VISIBLE, b)); // 显示或隐藏原来的键盘
      if (b) {
        new ProxySc().show();
      } else {
        new ProxySc().hide();
      }
    } */

    // 自定义组件部分
    const numberbuttons = [
      { x: 100, y: 200, text: '1' },
      { x: 200, y: 200, text: '2' },
      { x: 300, y: 200, text: '3' },
      { x: 100, y: 255, text: '4' },
      { x: 200, y: 255, text: '5' },
      { x: 300, y: 255, text: "6" },
      { x: 100, y: 310, text: '7' },
      { x: 200, y: 310, text: '8' },
      { x: 300, y: 310, text: '9' },
      { x: 200, y: 365, text: '0' },
      /* { x: 35, y: 298, text: '{' },
      { x: 82, y: 298, text: '}' },
      { x: 129, y: 298, text: ',' },
      { x: 174, y: 298, text: '.' },
      { x: 221, y: 298, text: '?' },
      { x: 268, y: 298, text: '!' },
      { x: 315, y: 298, text: '(' },
      { x: 362, y: 298, text: ')' },
      { x: 409, y: 298, text: '&' },
      { x: 82, y: 362, text: '=' },
      { x: 128, y: 362, text: '+' },
      { x: 174, y: 362, text: '@' },
      { x: 220, y: 362, text: '*' },
      { x: 268, y: 362, text: '~' },
      { x: 315, y: 362, text: '$' },
      { x: 362, y: 362, text: '%' } */
    ];

    numberbuttons.map(button => {
      let txtWd = txtGroup.createWidget(widget.BUTTON, {//数字键盘按钮控件
        x: button.x,
        y: button.y,
        w: 90,
        h: 50,
        radius: 17,
        normal_color: 0x202124,
        press_color: 0x6b6b6b,
        text: button.text,
        text_size: 29,
        click_func: (button_widget) => {
          inputText += button.text; // 更新输入内容
          displayText.setProperty(prop.TEXT, inputText); // 更新文本控件的内容
        }
      });
    });

    // 返回按钮
    /*    function backButtonClickFunc(button) {
         switchUI(true);
       }
       const backButton = txtGroup.createWidget(widget.BUTTON, {
         x: 305,
         y: 420,
         w: 50,
         h: 50,
         radius : 12,
         normal_color: 0x3fa7fe,
         press_color: 0x1a73d5,
         text: '返回',
         color: 0x000000,
         click_func: backButtonClickFunc
       });
   
       txtGroup.setProperty(prop.VISIBLE, false); // 设置隐藏 
    */


    //--------------------------------------------------------------------
    /*  const img_bd = createWidget(widget.BUTTON,{
             x: 80,
              y: 366,
             text: '符',
             w: 110,
               h: 50,
             radius: 17,
             normal_color: 0x3fa7fe,
             press_color: 0x1a73d5,
           })
           img_bd.addEventListener(event.CLICK_DOWN, function (info) {
             //控件注册事件监听
             console.log(info.x);
             switchbdUI(false);
           }) */


    //bdBg.setProperty(prop.VISIBLE, false)
    let bdGroup = createWidget(widget.GROUP, {
      x: 0,
      y: 0,
      w: 192,
      h: 490
    })
    let bdBg = bdGroup.createWidget(widget.FILL_RECT, {    // 自定义组件容器
      x: 10,
      y: 198,
      w: 460,
      h: 220,
      color: 0x00000
    })
    /*         function switchbdUI(b){
              img_bd.setProperty(prop.VISIBLE, b);
              bdBg.setProperty(prop.VISIBLE, !b);
              bdGroup.setProperty(prop.VISIBLE, !b);
              if(b){
                new ProxySc().show();
              } else {
                new ProxySc().hide();
              }
            }
 */
    // 自定义组件部分
    // 自定义组件部分
    const bdbuttons = [
      { x: 10, y: 235, text: '🤣' },
      { x: 57, y: 235, text: '😭' },
      { x: 104, y: 235, text: '😊' },
      { x: 151, y: 235, text: '😅' },
      { x: 198, y: 235, text: '😖' },
      { x: 243, y: 235, text: '😴' },
      { x: 290, y: 235, text: '🤡' },
      { x: 337, y: 235, text: '😁' },
      { x: 384, y: 235, text: '🥰' },
      { x: 431, y: 235, text: '🤔' },
      { x: 35, y: 298, text: '.' },
      { x: 82, y: 298, text: '/' },
      { x: 129, y: 298, text: ';' },
      { x: 174, y: 298, text: ':' },
      { x: 221, y: 298, text: '(' },
      { x: 268, y: 298, text: ')' },
      { x: 315, y: 298, text: '&' },
      { x: 362, y: 298, text: '$' },
      { x: 409, y: 298, text: '@' },
      { x: 82, y: 362, text: '-' },
      { x: 128, y: 362, text: '"' },
      { x: 174, y: 362, text: "'" },
      { x: 220, y: 362, text: ',' },
      { x: 268, y: 362, text: '?' },
      { x: 315, y: 362, text: '!' },
      { x: 362, y: 362, text: '~' }
    ];

    bdbuttons.map(button => {
      let bdWd = bdGroup.createWidget(widget.BUTTON, {//数字键盘按钮控件
        x: button.x,
        y: button.y,
        w: 40,
        h: 50,
        radius: 17,
        normal_color: 0x202124,
        press_color: 0x6b6b6b,
        text: button.text,
        text_size: 29,
        click_func: (button_widget) => {
          inputText += button.text; // 更新输入内容
          displayText.setProperty(prop.TEXT, inputText); // 更新文本控件的内容
        }
      });
    });

    /* 	function backClickFunc(button) {          // 返回按钮
        switchbdUI(true);
      }
      const bdbackButton = bdGroup.createWidget(widget.BUTTON, {
        x: 80,
         y: 366,
        text: 'back',
        w: 110,
          h: 50,
        radius: 17,
        normal_color: 0x3fa7fe,
        press_color: 0x1a73d5,
        click_func: backClickFunc
      })

      bdGroup.setProperty(prop.VISIBLE, false);    // 设置隐藏
 */

    //----------------------------------------------------------------------------
    const groups = [enjp, txtGroup, bdGroup];
    let currentGroupIndex = 0;

    // 隐藏所有组，除了第一个
    groups.forEach((group, index) => {
      group.setProperty(prop.VISIBLE, index === currentGroupIndex);
    });

    const switchButton = createWidget(widget.BUTTON, {
      x: 135,
      y: 420,
      w: 50,
      h: 50,
      text: "🌏",
      click_func: () => {
        // 隐藏当前组
        groups[currentGroupIndex].setProperty(prop.VISIBLE, false);
        // 更新索引
        currentGroupIndex = (currentGroupIndex + 1) % groups.length;
        // 显示下一个组
        groups[currentGroupIndex].setProperty(prop.VISIBLE, true);
      }
    });

  }
});