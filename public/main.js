$(function(){
	var signedIn = false;
	
	grabRecentItems();
	
	$('#home-nav-item').click(navHomeOnClick);
	$('#blog-nav-item').click(navBlogOnClick);
	$('#tutorials-nav-item').click(navTutorialsOnClick);
	$('#products-nav-item').click(navProductsOnClick);
	
	$('#search-submit').click(searchOnClick);
	
	$('#blog').click(blogOnClick);
	$('#tutorials').click(tutorialsOnClick);
	$('#products').click(productsOnClick);
	
	$('#signin').click(signInOnClick);
	$('#signin-submit').click(signinSubmitOnClick);
	
	$('#create').click(createOnClick);
	$('#create-submit').click(createSubmitOnClick);
			
	function grabRecentItems() {
		$('#recent-activity').html('');
		$.get('/overall/posts', function(data, status) {
			$.each(data, function(index, post) {
				$('#recent-activity')
					.append('<div class="recent-item recent-item-1" pid="' + post.id + '"><div class="recent-item-title">' + post.title + '</div>' +
							'<div class="recent-item-content">' + post.caption + '</div></div>');
			});
			$('.recent-item-1').click(recentPostOnClick);
		});
		$.get('/overall/tutorials', function(data, status) {
			$.each(data, function(index, tutorial) {
				$('#recent-activity')
					.append('<div class="recent-item recent-item-2" tid="' + tutorial.id + '"><div class="recent-item-title">' + tutorial.title + '</div>' +
							'<div class="recent-item-content">' + tutorial.caption + '</div></div>');
			});
			$('.recent-item-2').click(recentTutorialOnClick);
		});	
		$.get('/overall/products', function(data, status) {
			$.each(data, function(index, product) {
				$('#recent-activity')
					.append('<div class="recent-item recent-item-3" pid="' + product.id + '"><div class="recent-item-title">' + product.title + '</div>' +
							'<div class="recent-item-content">' + product.caption + '</div></div>');
			});
			$('.recent-item-3').click(recentProductOnClick);
		});
	}
	
	function navHomeOnClick() {
		$('html, body').animate({ scrollTop: $('#top').offset().top}, 250);
	}
	
	function navBlogOnClick() {
		blogOnClick();
		$('html, body').animate({ scrollTop: $('#blog').offset().top}, 250);
	}
	
	function navTutorialsOnClick() {
		tutorialsOnClick();
		$('html, body').animate({ scrollTop: $('#tutorials').offset().top}, 250);
	}
	
	function navProductsOnClick() {
		productsOnClick();
		$('html, body').animate({ scrollTop: $('#products').offset().top}, 250);
	}
	
	

	function blogOnClick() {
		$.get('/posts', function(data, status) {
			var posts = data;
			$('#main-item-holder').slideUp("fast", function() {
				document.documentElement.style.setProperty('--current-lgt-color', '#ffedf0');
				document.documentElement.style.setProperty('--current-med-color', '#F9CAD2');
				$('#main-item-holder').html('');
				$('.container-main').show();
				$.each(posts, function(index, post) {
					$('#main-item-holder')
						.append('<div class="main-item"><div class="main-item-content"><img class="item-img" src="' + post.img_name +
								'"/><div class="main-item-title">' + post.title + '</div><div class="main-item-description">' + post.caption +
								'</div><button class="btn btn-primary read-more" postid="' + post.id + '" itemtype="post">Read More</button></div></div>');
				});
				$('.read-more').click(readMoreOnClick);
				$('#main-item-holder').slideDown("fast");
			});
		});
	}
	
	function tutorialsOnClick() {
		$.get('/tutorials', function(data, status) {
			var posts = data;
			$('#main-item-holder').slideUp("fast", function() {
				document.documentElement.style.setProperty('--current-lgt-color', '#e0e7fc');
				document.documentElement.style.setProperty('--current-med-color', '#7081B7');
				$('#main-item-holder').html('');
				$('.container-main').show();
				$.each(posts, function(index, post) {
					$('#main-item-holder')
						.append('<div class="main-item"><div class="main-item-content"><img class="item-img" src="' + post.img_name +
								'"/><div class="main-item-title">' + post.title + '</div><div class="main-item-description">' + post.caption +
								'</div><button class="btn btn-primary read-more" postid="' + post.id + '" itemtype="tutorial">Read More</button></div></div>');
				});
				$('.read-more').click(readMoreOnClick);
				$('#main-item-holder').slideDown("fast");
			});
		});
	}
	
	function productsOnClick() {
		$.get('/products', function(data, status) {
			var posts = data;
			$('#main-item-holder').slideUp("fast", function() {
				document.documentElement.style.setProperty('--current-lgt-color', '#fff7ef');
				document.documentElement.style.setProperty('--current-med-color', '#F8E8D8');
				$('#main-item-holder').html('');
				$('.container-main').show();
				$.each(posts, function(index, post) {
					$('#main-item-holder')
						.append('<div class="main-item"><div class="main-item-content"><img class="item-img" src="' + post.img_name +
								'"/><div class="main-item-title">' + post.title + '</div><div class="main-item-description">' + post.caption + ' ' + post.cost +
								'</div><button class="btn btn-primary read-more" postid="' + post.id + '" itemtype="product">Read More</button></div></div>');
				});
				$('.read-more').click(readMoreOnClick);
				$('#main-item-holder').slideDown("fast");
			});
		});
	}
	
	function readMoreOnClick() {
		var id = $(this).attr('postid');
		var type = $(this).attr('itemtype');
		if (type == "post") {
			$.get('/posts/' + id, function(data, status) {
				$('#main-item-holder').slideUp("fast", function () {
					$('#main-item-holder')
						.html('')
						.append('<input type="hidden" id="post-id" value="' + data[0].id + '"/>')
						.append('<div class="main-item"><div class="main-item-content"><img class="item-img" src="' + data[0].img_name +
								'"/><div class="main-item-title">' + data[0].title + '</div><div class="main-item-description">' + data[0].caption + 
								'</div><div class="main-item-content">' + data[0].content + '</div>' + 
								'<div class="main-item-comments"><div class="container"><h3>Comments</h3></div>');
					if (signedIn) {
						$('#main-item-holder').append('<div class="main-item-add"><div class="form-group"><input type="text" id="add-comment-text" ' + 
													  'placeholder="add comment" class="form-control"/>' +
													  '<button id="add-comment-submit" class="btn btn-primary">Add</button></div></div>');
					} else {
						$('#main-item-holder').append('<div class="container"><h4>You must be signed in to add a comment.</h4></div>');
					}
					$.each(data[0].comments, function(index, comment) {
						$('#main-item-holder').append('<div class="container comment"><div class="comment-author">' + comment.author_name + 
							                          '</div>' + comment.content + '</div>');	
					});
					$('#main-item-holder').append('</div></div></div>');
					$('#add-comment-submit').click(addCommentOnClick);
					$('html, body').animate({ scrollTop: $('#products').offset().top}, 250, function() {
						$('#main-item-holder').slideDown("fast");
					});
				});
			});
		} else if (type == "tutorial") {
			$.get('/tutorials/' + id, function(data, status) {
				$('#main-item-holder').slideUp("fast", function () {
					$('#main-item-holder')
						.html('')
						.append('<input type="hidden" id="tutorial-id" value="' + data[0].id + '"/>')
						.append('<div class="main-item"><div class="main-item-content"><img class="item-img" src="' + data[0].img_name +
								'"/><div class="main-item-title">' + data[0].title + '</div><div class="main-item-description">' + data[0].caption + 
								'</div><div class="main-item-content">' + data[0].content + '</div><div class="main-item-comments"><div class="container">' +
								'<h3>DIYs</h3></div>');
					if (signedIn) {
						$('#main-item-holder').append('<div class="main-item-add"><div class="form-group"><input type="text" id="add-comment-text" ' + 
								'placeholder="add DIY" class="form-control"/>' +
								'<button id="add-comment-submit" class="btn btn-primary">Add</button></div></div>');
					} else {
						$('#main-item-holder').append('<div class="container"><h4>You must be signed in to add a DIY.</h4></div>');
					}
					$.each(data[0].diys, function(index, diy) {
						$('#main-item-holder').append('<div class="container comment"><div class="comment-author">' + diy.author_name + 
							                          '</div>' + diy.content + '</div>');	
					});		
					$('#main-item-holder').append('</div></div></div>');
					$('#add-comment-submit').click(addDIYOnClick);
					$('html, body').animate({ scrollTop: $('#products').offset().top}, 250, function() {
						$('#main-item-holder').slideDown("fast");
					});
				});
			});
		} else {
			$.get('/products/' + id, function(data, status) {
				$('#main-item-holder').slideUp("fast", function () {
					$('#main-item-holder')
						.html('')
						.append('<div class="main-item"><div class="main-item-content"><img class="item-img" src="' + data[0].img_name +
								'"/><div class="main-item-title">' + data[0].title + '</div><div class="main-item-description">' + data[0].caption + ' ' + data[0].cost +
								' ' + data[0].count + '</div><div class="main-item-content">' + '</div></div></div>')
						.append('<div class="container"><h3>I will not be implementing the product shop for this project (too much more)</h3></div>');
					$('html, body').animate({ scrollTop: $('#products').offset().top}, 250, function() {
						$('#main-item-holder').slideDown("fast");
					});
				});
			});
		}
	}
	
	function signInOnClick() {
		$('#createContainer').slideUp("fast", function () {
			$('#signinContainer').slideToggle("fast");
		});
	}
	
	function signinSubmitOnClick() {
		var username = $("#username").val();
		var password = $("#password").val();

		var params = {
			username: username,
			password: password
		};

		$.post('/overall/signin', params, function(result) {
			if (result && result.success) {
				$('#signinContainer').slideUp("fast");
				signedIn = true;
			}
		}).fail(function(result) {
			alert(result.message);
			//console.log(result.message);
		});
	}
	
	function createOnClick() {
		$('#signinContainer').slideUp("fast", function () {
			$('#createContainer').slideToggle("fast");
		});
	}
	
	function createSubmitOnClick() {
		var username = $('#create-username').val();
		var password = $('#create-password').val();
		var first = $('#create-first').val();
		var last = $('#create-last').val();
		var email = $('#create-email').val();
		
		var params = {
			username: username,
			password: password,
			first: first,
			last: last,
			email: email
		};
		
		$.post('/overall/create', params, function(result) {
			if (result && result.success) {
				alert('success');
				signedIn = true;
			}
		}).fail(function(result) {
			//console.log(result.message);
			alert(result.message);
		});
	}
	
	function addCommentOnClick() {
		var comment = $('#add-comment-text').val();
		var id = $('#post-id').val();
		var params = {
			comment: comment,
			id: id
		};
		$.post('/posts/comment', params, function(result) {
			if (result && result.success) {
				$('#main-item-holder').append('<div class="container comment"><div class="comment-author">' + result.user + 
							                  '</div>' + comment + '</div>');	
				$('#add-comment-text').val('');
			}
		}).fail(function(result) {
			alert("Something went wrong. You must be logged in!");
		});
	}
	
	function addDIYOnClick() {
		var tutorial = $('#add-comment-text').val();
		var id = $('#tutorial-id').val();
		var params = {
			tutorial: tutorial,
			id: id
		};
		$.post('/tutorials/diy', params, function(result) {
			if (result && result.success) {
				$('#main-item-holder').append('<div class="container comment"><div class="comment-author">' + result.user + 
							                  '</div>' + tutorial + '</div>');	
				$('#add-comment-text').val('');
			}
		}).fail(function(result) {
			alert("Something went wrong. You must be logged in!");
		});
	}
	
	function recentPostOnClick() {
		var pid = $(this).attr('pid');
		$.get('/posts/' + pid, function(data, status) {
			$('#searchModal').modal('hide');
			$('#main-item-holder').slideUp("fast", function () {
				document.documentElement.style.setProperty('--current-lgt-color', '#ffedf0');
				document.documentElement.style.setProperty('--current-med-color', '#F9CAD2');
				$('#main-item-holder')
					.html('')
					.append('<input type="hidden" id="post-id" value="' + data[0].id + '"/>')
					.append('<div class="main-item"><div class="main-item-content"><img class="item-img" src="' + data[0].img_name +
							'"/><div class="main-item-title">' + data[0].title + '</div><div class="main-item-description">' + data[0].caption + 
							'</div><div class="main-item-content">' + data[0].content + '</div>' + 
							'<div class="main-item-comments"><div class="container"><h3>Comments</h3></div>');
				if (signedIn) {
					$('#main-item-holder').append('<div class="main-item-add"><div class="form-group"><input type="text" id="add-comment-text" ' + 
												  'placeholder="add comment" class="form-control"/>' +
												  '<button id="add-comment-submit" class="btn btn-primary">Add</button></div></div>');
				} else {
					$('#main-item-holder').append('<div class="container"><h4>You must be signed in to add a comment.</h4></div>');
				}
				$.each(data[0].comments, function(index, comment) {
					$('#main-item-holder').append('<div class="container comment"><div class="comment-author">' + comment.author_name + 
												  '</div>' + comment.content + '</div>');	
				});
				$('#main-item-holder').append('</div></div></div>');
				$('#add-comment-submit').click(addCommentOnClick);
				$('html, body').animate({ scrollTop: $('#products').offset().top}, 250, function() {
					$('.container-main').show();
					$('#main-item-holder').slideDown("fast");
				});
			});
		});
	}
	
	function recentTutorialOnClick() {
		var tid = $(this).attr('tid');
		$.get('/tutorials/' + tid, function(data, status) {
			$('#searchModal').modal('hide');
			$('#main-item-holder').slideUp("fast", function () {
				document.documentElement.style.setProperty('--current-lgt-color', '#e0e7fc');
				document.documentElement.style.setProperty('--current-med-color', '#7081B7');
				$('#main-item-holder')
					.html('')
					.append('<input type="hidden" id="tutorial-id" value="' + data[0].id + '"/>')
					.append('<div class="main-item"><div class="main-item-content"><img class="item-img" src="' + data[0].img_name +
							'"/><div class="main-item-title">' + data[0].title + '</div><div class="main-item-description">' + data[0].caption + 
							'</div><div class="main-item-content">' + data[0].content + '</div><div class="main-item-comments"><div class="container">' +
							'<h3>DIYs</h3></div>');
				if (signedIn) {
					$('#main-item-holder').append('<div class="main-item-add"><div class="form-group"><input type="text" id="add-comment-text" ' + 
							'placeholder="add DIY" class="form-control"/>' +
							'<button id="add-comment-submit" class="btn btn-primary">Add</button></div></div>');
				} else {
					$('#main-item-holder').append('<div class="container"><h4>You must be signed in to add a DIY.</h4></div>');
				}
				$.each(data[0].diys, function(index, diy) {
					$('#main-item-holder').append('<div class="container comment"><div class="comment-author">' + diy.author_name + 
												  '</div>' + diy.content + '</div>');	
				});		
				$('#main-item-holder').append('</div></div></div>');
				$('#add-comment-submit').click(addDIYOnClick);
				$('html, body').animate({ scrollTop: $('#products').offset().top}, 250, function() {
					$('.container-main').show();
					$('#main-item-holder').slideDown("fast");
				});
			});
		});
	}
	
	function recentProductOnClick() {
		var pid = $(this).attr('pid');
		$.get('/products/' + pid, function(data, status) {
			$('#searchModal').modal('hide');
			$('#main-item-holder').slideUp("fast", function () {
				document.documentElement.style.setProperty('--current-lgt-color', '#fff7ef');
				document.documentElement.style.setProperty('--current-med-color', '#F8E8D8');
				$('#main-item-holder')
					.html('')
					.append('<div class="main-item"><div class="main-item-content"><img class="item-img" src="' + data[0].img_name +
							'"/><div class="main-item-title">' + data[0].title + '</div><div class="main-item-description">' + data[0].description + ' ' + data[0].cost +
							' ' + data[0].count + '</div><div class="main-item-content">' + '</div></div></div>')
					.append('<div class="container"><h3>I will not be implementing the product shop for this project (too much more)</h3></div>');
				$('html, body').animate({ scrollTop: $('#products').offset().top}, 250, function() {
					$('.container-main').show();
					$('#main-item-holder').slideDown("fast");
				});
			});
		});
	}
	
	function searchOnClick() {
		//$('#searchResults').html('');
		//$('#searchResults').show();
		$('#modalBody').text('');
		var search = $('#search-text').val();
		if (search && search.length > 2) {
			$.get('/overall/search/blog/' + search, function(dataB, statusB) {
				$.get('/overall/search/tutorials/' + search, function(dataT, statusT) {
					$.get('/overall/search/products/' + search, function(dataP, statusP) {
						$.each(dataB, function(index, entry) {
							$('#modalBody').append('<div class="recent-item search-item-1 recent-item-1" pid="' + entry.id + '"><div class="recent-item-title">' + entry.title + '</div>' +
													   '<div class="recent-item-content">' + entry.caption + '</div></div>');
						});
						$.each(dataT, function(index, entry) {
							$('#modalBody').append('<div class="recent-item search-item-2 recent-item-2" tid="' + entry.id + '"><div class="recent-item-title">' + entry.title + '</div>' +
													   '<div class="recent-item-content">' + entry.caption + '</div></div>');
						});
						$.each(dataP, function(index, entry) {
							$('#modalBody').append('<div class="recent-item search-item-3 recent-item-3" pid="' + entry.id + '"><div class="recent-item-title">' + entry.title + '</div>' +
													   '<div class="recent-item-content">' + entry.description + '</div></div>');
						});
						$('.recent-item-1').click(recentPostOnClick);
						$('.recent-item-2').click(recentTutorialOnClick);
						$('.recent-item-3').click(recentProductOnClick);
						if (!$('#modalBody').text()) {
							$('#modalBody').html('<p>No results.<p>');
						}
						$('#searchModal').modal('show');
					});
				});
			});
		} else {
			alert("Invalid search query.");
		}
	}
	
	/*$('.item-img').each(function(index) {
		$(this).parent().width($(this).width());
	});*/
});