function report(link, action_type){
	var parse_link = parseUrl(link);
	if(parse_link == null){ return; }
	var query_obj = parseParams( parse_link['query_str'] );
	query_obj['action_type'] = action_type;
	query_obj['action_link'] = 'http://game.id87.com/game/fangyan';
	var report_url = 'report.php?' + jQuery.param( query_obj );
	$.ajax({ url: report_url, type: 'POST', timeout: 2000})
}

function share_scene(link, scene_type){
	var parse_link = parseUrl(link);
	if(parse_link == null){	  return link;	}
	var query_obj = parseParams( parse_link['query_str'] );
	query_obj['scene'] = scene_type;
	var share_url = 'http://' + parse_link['domain'] + parse_link['path'] + '?' + jQuery.param( query_obj ) + (parse_link['sharp'] ? parse_link['sharp'] : '');
	return share_url;
}
function recordscore(t){
	var record_url = 'record.php?t=' + t;
	$.ajax({ url: record_url, type: 'POST', timeout: 2000})
}

function modifyTitle(tScore){
	switch (tScore){
	  case 7:
	  		document.title = "我的绿商测试全做对了,获得了“绿色卫士”称号!";
	  		break;
	  case 0:
	  		document.title = "绿商测试，我居然一题都没对，也是醉了，你来跟我比比谁的分低?";
	  		break;
	  default:
	  		document.title = "绿商测试，我做对了" + tScore + "题，你也来挑战一下吧，能不能超过我？";
	}
}
