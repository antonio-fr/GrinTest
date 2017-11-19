function refreshdata(){
	$.ajax({
			url: 'https://factory.czam.me/v1/chain', dataType: 'json'
		})
		.done(function(data) {
			$('#gnlatestblk').html("Latest block # is</br>"+data["height"]);
			var blkhash = data["last_block_pushed"];
			$('#gnblkhash').html('with BlockHash : <nobr>'+blkhash.slice(0,6)+'&#8943;'+blkhash.slice(-6)+'</nobr>');
			$('#gnblkhash')[0].title = blkhash;
			setTimeout(refreshdata, 20000);
		})
		.fail(function(data) {
			$('#gnlatestblk').html("Latest block # is</br>not available");
			$('#gnblkhash').html(" - ");
			setTimeout(refreshdata, 5000);
		});
}
$("#gnlatestblk").ready(function(){
	refreshdata();
});
