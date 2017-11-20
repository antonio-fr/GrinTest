function refreshdata(first){
	$.ajax({
			url: 'https://grintest.net/v1/chain', dataType: 'json'
		})
		.done(function(data) {
			$('#gnlatestblk').html("Latest block # is</br>"+data["height"]);
			var blkhash = data["last_block_pushed"];
			$('#gnblkhash').html('with BlockHash : <nobr>'+blkhash.slice(0,6)+'&#8943;'+blkhash.slice(-6)+'</nobr>');
			$('#gnblkhash')[0].title = blkhash;
			var blkheight = parseInt(data["height"])
			if (first){
				initblock = blkheight;
			}
			else{
				rdeg = (blkheight-initblock)*360;
				if (rdeg>1080) rdeg=1080;
				$('.avatar img').css("-moz-transform","rotate("+rdeg+"deg)");
				$('.avatar img').css("-webkit-transform","rotate("+rdeg+"deg)");
				$('.avatar img').css("-ms-transform","rotate("+rdeg+"deg)");
				$('.avatar img').css("transform","rotate("+rdeg+"deg)");
			}
			setTimeout(refreshdata, 20000);
		})
		.fail(function(data) {
			$('#gnlatestblk').html("Latest block # is</br>not available");
			$('#gnblkhash').html(" - ");
			setTimeout(refreshdata, false, 5000);
		});
}
$("#gnlatestblk").ready(function(){
	refreshdata(true);
});
