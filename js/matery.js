$(function () {
  /**
   * 添加文章卡片hover效果.
   */
  let articleCardHover = function () {
    let animateClass = 'animated pulse';
    $('article .article').hover(function () {
      $(this).addClass(animateClass);
    }, function () {
      $(this).removeClass(animateClass);
    });
  };
  articleCardHover();


  $.smartScroll = function (container, selectorScrollable) {
    // 如果没有滚动容器选择器，或者已经绑定了滚动时间，忽略
    if (!selectorScrollable || container.data('isBindScroll')) {
      return;
    }

    // 是否是搓浏览器
    // 自己在这里添加判断和筛选
    var isSBBrowser;

    var data = {
      posY: 0,
      maxscroll: 0
    };

    // 事件处理
    container.on({
      touchstart: function (event) {
        var events = event.touches[0] || event;

        // 先求得是不是滚动元素或者滚动元素的子元素
        var elTarget = $(event.target);

        if (!elTarget.length) {
          return;
        }

        var elScroll;

        // 获取标记的滚动元素，自身或子元素皆可
        if (elTarget.is(selectorScrollable)) {
          elScroll = elTarget;
        } else if ((elScroll = elTarget.parents(selectorScrollable)).length == 0) {
          elScroll = null;
        }

        if (!elScroll) {
          return;
        }

        // 当前滚动元素标记
        data.elScroll = elScroll;

        // 垂直位置标记
        data.posY = events.pageY;
        data.scrollY = elScroll.scrollTop();
        // 是否可以滚动
        data.maxscroll = elScroll[0].scrollHeight - elScroll[0].clientHeight;
      },
      touchmove: function (event) {
        // 如果不足于滚动，则禁止触发整个窗体元素的滚动
        if (data.maxscroll <= 0 || isSBBrowser) {
          // 禁止滚动
          event.preventDefault();
        }
        // 滚动元素
        var elScroll = data.elScroll;
        // 当前的滚动高度
        var scrollTop = elScroll.scrollTop();

        // 现在移动的垂直位置，用来判断是往上移动还是往下
        var events = event.touches[0] || event;
        // 移动距离
        var distanceY = events.pageY - data.posY;

        if (isSBBrowser) {
          elScroll.scrollTop(data.scrollY - distanceY);
          elScroll.trigger('scroll');
          return;
        }

        // 上下边缘检测
        if (distanceY > 0 && scrollTop == 0) {
          // 往上滑，并且到头
          // 禁止滚动的默认行为
          event.preventDefault();
          return;
        }

        // 下边缘检测
        if (distanceY < 0 && (scrollTop + 1 >= data.maxscroll)) {
          // 往下滑，并且到头
          // 禁止滚动的默认行为
          event.preventDefault();
          return;
        }
      },
      touchend: function () {
        data.maxscroll = 0;
      }
    });

    // 防止多次重复绑定
    container.data('isBindScroll', true);
  };



  /*菜单切换*/
  $('.sidenav').sidenav();

  $(document).on('click', '.sidenav-overlay', function(event) {
    event.preventDefault();
    event.stopPropagation();
  })
  // $('.sidenav,.sidenav-overlay').on('touchmove', function (event) {
  //   event.preventDefault();
  //   event.stopPropagation();
  // }, false)

  // $.smartScroll($('body'), '.sidenav')
  // // $('html').addClass('noscroll');

  // $('.sidenav-overlay').on('click', function () {
  //   console.log('测试哦下哈哈哈');
  //   $('html').removeClass('noscroll');
  // })

  // $.smartScroll(container, selectorScrollable);

  /* 修复文章卡片 div 的宽度. */
  let fixPostCardWidth = function (srcId, targetId) {
    let srcDiv = $('#' + srcId);
    if (srcDiv.length === 0) {
      return;
    }

    let w = srcDiv.width();
    if (w >= 450) {
      w = w + 21;
    } else if (w >= 350 && w < 450) {
      w = w + 18;
    } else if (w >= 300 && w < 350) {
      w = w + 16;
    } else {
      w = w + 14;
    }
    $('#' + targetId).width(w);
  };

  /**
   * 修复footer部分的位置，使得在内容比较少时，footer也会在底部.
   */
  let fixFooterPosition = function () {
    $('.content').css('min-height', window.innerHeight - 165);
  };

  /**
   * 修复样式.
   */
  let fixStyles = function () {
    fixPostCardWidth('navContainer');
    fixPostCardWidth('artDetail', 'prenext-posts');
    fixFooterPosition();
  };
  fixStyles();

  /*调整屏幕宽度时重新设置文章列的宽度，修复小间距问题*/
  $(window).resize(function () {
    fixStyles();
  });

  /*初始化瀑布流布局*/
  $('#articles').masonry({
    itemSelector: '.article'
  });

  AOS.init({
    easing: 'ease-in-out-sine',
    duration: 700,
    delay: 100
  });

  /*文章内容详情的一些初始化特性*/
  let articleInit = function () {
    $('#articleContent a').attr('target', '_blank');

    $('#articleContent img').each(function () {
      let imgPath = $(this).attr('src');
      $(this).wrap('<div class="img-item" data-src="' + imgPath + '" data-sub-html=".caption"></div>');
      // 图片添加阴影
      $(this).addClass("img-shadow img-margin");

      //为文章内的图片添加no-referrer来隐藏referer（解决第三方图片外链不显示问题）
      $(this).attr('referrerpolicy', 'no-referrer');
      // $('.img-item').attr('referrerpolicy', 'no-referrer');
      //为文章内的图片添加no-referrer来隐藏referer（解决第三方图片外链不显示问题）
      $('.lg-thumb-item').find('img').attr('referrerpolicy', 'no-referrer');

      // 图片添加字幕
      let alt = $(this).attr('alt');
      let title = $(this).attr('title');
      let captionText = "";



      // 如果alt为空，title来替
      if (alt === undefined || alt === "") {
        if (title !== undefined && title !== "") {
          captionText = title;
        }
      } else {
        captionText = alt;
      }
      // 字幕不空，添加之
      if (captionText !== "") {
        let captionDiv = document.createElement('div');
        captionDiv.className = 'caption';
        let captionEle = document.createElement('b');
        captionEle.className = 'center-caption';
        captionEle.innerText = captionText;
        captionDiv.appendChild(captionEle);
        this.insertAdjacentElement('afterend', captionDiv)
      }
    });
    $('#articleContent, #myGallery').lightGallery({
      selector: '.img-item',
      // 启用字幕
      subHtmlSelectorRelative: true
    });

    // progress bar init
    const progressElement = window.document.querySelector('.progress-bar');
    if (progressElement) {
      new ScrollProgress((x, y) => {
        progressElement.style.width = y * 100 + '%';
      });
    }
  };
  articleInit();

  $('.modal').modal();

  /*回到顶部*/
  $('#backTop').click(function () {
    $('body,html').animate({ scrollTop: 0 }, 400);
    return false;
  });

  /*监听滚动条位置*/
  let $nav = $('#headNav');
  let $backTop = $('.top-scroll');
  // 当页面处于文章中部的时候刷新页面，因为此时无滚动，所以需要判断位置,给导航加上绿色。
  showOrHideNavBg($(window).scrollTop());
  $(window).scroll(function () {
    /* 回到顶部按钮根据滚动条的位置的显示和隐藏.*/
    let scroll = $(window).scrollTop();
    showOrHideNavBg(scroll);
  });

  function showOrHideNavBg (position) {
    let showPosition = 100;
    if (position < showPosition) {
      $nav.addClass('nav-transparent');
      $backTop.slideUp(300);
    } else {
      $nav.removeClass('nav-transparent');
      $backTop.slideDown(300);
    }
  }


  $(".nav-menu>li").hover(function () {
    $(this).children('ul').stop(true, true).show();
    $(this).addClass('nav-show').siblings('li').removeClass('nav-show');

  }, function () {
    $(this).children('ul').stop(true, true).hide();
    $('.nav-item.nav-show').removeClass('nav-show');
  })

  $('.m-nav-item>a').on('click', function () {
    if ($(this).next('ul').css('display') == "none") {
      $('.m-nav-item').children('ul').slideUp(300);
      $(this).next('ul').slideDown(100);
      $(this).parent('li').addClass('m-nav-show').siblings('li').removeClass('m-nav-show');
    } else {
      $(this).next('ul').slideUp(100);
      $('.m-nav-item.m-nav-show').removeClass('m-nav-show');
    }
  });




});




