function refreshdata(){
	$.ajax({
			url: 'https://grintest.net/v1/chain',
			dataType: 'json',
			cache: false
		})
		.done(function(data) {
			$('#gnlatestblk').html("Latest block # is</br>"+data["height"]);
			var blkhash = data["last_block_pushed"];
			$('#gnblkhash').html('with BlockHash : <nobr>'+blkhash.slice(0,6)+'&#8943;'+blkhash.slice(-6)+'</nobr>');
			$('#gnblkhash')[0].title = blkhash;
			var blkheight = parseInt(data["height"])
			if (typeof latestblk  === 'undefined'){
				latestblk = blkheight
				trot = 0;
			}
			trot += Math.min(blkheight-latestblk,3);
			$('.avatar img').css("-moz-transform","rotate("+trot+"turn)");
			$('.avatar img').css("-webkit-transform","rotate("+trot+"turn)");
			$('.avatar img').css("-ms-transform","rotate("+(trot*360)+"deg)");
			$('.avatar img').css("transform","rotate("+trot+"turn)");
			latestblk = blkheight;
			setTimeout(refreshdata, 20000);
		})
		.fail(function(data) {
			$('#gnlatestblk').html("Latest block # is</br>not available");
			$('#gnblkhash').html(" - ");
			setTimeout(refreshdata, 5000);
		});
};
$("#gnlatestblk").ready(function(){
	refreshdata();
});
