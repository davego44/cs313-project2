$(function(){
	
	grabRecentItems();
			
	function grabRecentItems() {
		$('#recent-activity').html('');
		$.get('/overall/posts', function(data, status) {
			$.each(data, function(index, post) {
				$('#recent-activity')
					.append('<div class="recent-item recent-item-1"><div class="recent-item-title">' + post.title + '</div>' +
							'<div class="recent-item-content">' + post.caption + '</div></div>');
			});
		});
		$.get('/overall/tutorials', function(data, status) {
			$.each(data, function(index, tutorial) {
				$('#recent-activity')
					.append('<div class="recent-item recent-item-2"><div class="recent-item-title">' + tutorial.title + '</div>' +
							'<div class="recent-item-content">' + tutorial.caption + '</div></div>');
			});
		});	
		$.get('/overall/products', function(data, status) {
			$.each(data, function(index, product) {
				$('#recent-activity')
					.append('<div class="recent-item recent-item-3"><div class="recent-item-title">' + product.title + '</div>' +
							'<div class="recent-item-content">' + product.caption + '</div></div>');
			});
		});
	}

	$('#blog').click(blogOnClick);
	$('#tutorials').click(tutorialsOnClick);
	$('#products').click(productsOnClick);

	function blogOnClick() {
		$.get('/posts', function(data, status) {
			var posts = data;
			document.documentElement.style.setProperty('--current-lgt-color', '#ffedf0');
			document.documentElement.style.setProperty('--current-med-color', '#F9CAD2');
			$('#main-item-holder').html('');
			$('.container-main').show();
			$.each(posts, function(index, post) {
				$('#main-item-holder')
					.append('<div class="main-item"><div class="main-item-content"><img class="item-img" src="' + post.img_name +
							'"/><div class="main-item-title">' + post.title + '</div><div class="main-item-description">' + post.caption +
							'</div><button class="btn btn-primary">Read More</button></div></div>');
			});
		});
	}
	
	function tutorialsOnClick() {
		$.get('/tutorials', function(data, status) {
			var posts = data;
			document.documentElement.style.setProperty('--current-lgt-color', '#e0e7fc');
			document.documentElement.style.setProperty('--current-med-color', '#7081B7');
			$('#main-item-holder').html('');
			$('.container-main').show();
			$.each(posts, function(index, post) {
				$('#main-item-holder')
					.append('<div class="main-item"><div class="main-item-content"><img class="item-img" src="' + post.img_name +
							'"/><div class="main-item-title">' + post.title + '</div><div class="main-item-description">' + post.caption +
							'</div><button class="btn btn-primary">Read More</button></div></div>');
			});
		});
	}
	
	function productsOnClick() {
		$.get('/products', function(data, status) {
			var posts = data;
			document.documentElement.style.setProperty('--current-lgt-color', '#fff7ef');
			document.documentElement.style.setProperty('--current-med-color', '#F8E8D8');
			$('#main-item-holder').html('');
			$('.container-main').show();
			$.each(posts, function(index, post) {
				$('#main-item-holder')
					.append('<div class="main-item"><div class="main-item-content"><img class="item-img" src="' + post.img_name +
							'"/><div class="main-item-title">' + post.title + '</div><div class="main-item-description">' + post.caption + ' ' + post.cost +
							'</div><button class="btn btn-primary">Read More</button></div></div>');
			});
		});
	}
	
	/*$('.item-img').each(function(index) {
		$(this).parent().width($(this).width());
	});*/
});