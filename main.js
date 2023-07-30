'use strict';
$(document).ready(function () {
  const myClasses = $(".sort");
  let activeElement = null;
  let lastSaveClickTime = 0;

  function removeActiveClass() {
    if (activeElement) {
      activeElement.removeClass('active');
    }
  }

  $(document).on('click', function (e) {
    if (!$(e.target).closest('.my-classes__row').length) {
      removeActiveClass();
    }
  });

  function openModal($row) {
    $('.my-classes__backdrop').addClass('visible');

    // Обробник події для кнопки "Видалити" в модальному вікні
    $('.my-classes__button-delete').off().on('click', function (event) {
      event.preventDefault();
      $row.remove();
      $('.my-classes__backdrop').removeClass('visible');
    });

    // Обробник події для кнопки "Відміна" в модальному вікні
    $('.my-classes__button-abolition').off().on('click', function (event) {
      event.preventDefault();
      $('.my-classes__backdrop').removeClass('visible');
    });

    // Обробник події для кнопки "Закрити" в модальному вікні
    $('.my-classes__close').off().on('click', function (event) {
      event.preventDefault();
      $('.my-classes__backdrop').removeClass('visible');
    });
  }

  myClasses.on('click', function (e) {
    if (!$(e.target).closest('.my-classes__edit, .my-classes__delete').length) {
      removeActiveClass();
      $(this).addClass('active');
      activeElement = $(this);
    }
  });

  $(".my-classes__edit").on('click', function (e) {
    e.stopPropagation();
    removeActiveClass();
  });

  $(".my-classes__delete").on('click', function (e) {
    e.stopPropagation();
    removeActiveClass();
    openModal($(this).closest('.my-classes__row'));
  });

  $('.my-classes__save').click(function (event) {
    event.preventDefault();
    const currentTime = new Date().getTime();
    if (currentTime - lastSaveClickTime < 300) {
      return;
    }
    lastSaveClickTime = currentTime;

    const $row = $(this).closest('.my-classes__row');
    const $name = $row.find('.my-classes__name');
    const $input = $row.find('.my-classes__input');
    const $editLink = $row.find('.my-classes__edit');
    const $saveLink = $(this);

    $name.text($input.val().trim()).removeClass('hidden');
    $input.addClass('hidden');
    setTimeout(function () {
      $saveLink.addClass('hidden');
      $editLink.removeClass('hidden');
    }, 300); // Затримка 0.3 секунди (300 мілісекунд)
  });

  $('.my-classes__input').on('blur keypress', function (event) {
    if (event.type === 'blur' || (event.type === 'keypress' && event.which === 13)) {
      const $row = $(this).closest('.my-classes__row');
      const $name = $row.find('.my-classes__name');
      const $input = $(this);
      const $editLink = $row.find('.my-classes__edit');
      const $saveLink = $row.find('.my-classes__save');

      $name.text($input.val().trim()).removeClass('hidden');
      $input.addClass('hidden');
      setTimeout(function () {
        $saveLink.addClass('hidden');
        $editLink.removeClass('hidden');
      }, 300); // Затримка 0.3 секунди (300 мілісекунд)
    }
  });

  $('.my-classes__input').on('focusout', function (event) {
    const $row = $(this).closest('.my-classes__row');
    const $name = $row.find('.my-classes__name');
    const $input = $(this);
    const $editLink = $row.find('.my-classes__edit');
    const $saveLink = $row.find('.my-classes__save');

    $name.text($input.val().trim()).removeClass('hidden');
    $input.addClass('hidden');
    setTimeout(function () {
      $saveLink.addClass('hidden');
      $editLink.removeClass('hidden');
    }, 300); // Затримка 0.3 секунди (300 мілісекунд)
  });
});

// sort

  const sortStates = {
    ".my-classes__name": "none",
    ".my-classes__fault": "none",
    ".my-classes__mark": "none",
  };
  
  let originalItemsOrder = [];
  let lastSortColumn = null;
  
  function sortList(sortBy) {
    const list = $(".my-classes__list");
    const items = list.children(".sort").get();
  
    if (originalItemsOrder.length === 0) {
      originalItemsOrder = items.slice(0);
    }
  
    const isDifferentColumn = lastSortColumn !== sortBy;
    lastSortColumn = sortBy;
  
    if (sortStates[sortBy] === "none") {
      sortStates[sortBy] = "asc";
    } else if (sortStates[sortBy] === "asc") {
      sortStates[sortBy] = "desc";
    } else {
      sortStates[sortBy] = "none";
    }
  
    $(".my-classes__sort").removeClass("sorted-asc sorted-desc");
  
    const icon = $(this).find(".my-classes__sort");
    if (sortStates[sortBy] === "asc") {
      icon.addClass("sorted-asc");
    } else if (sortStates[sortBy] === "desc") {
      icon.addClass("sorted-desc");
    }
  
    if (sortStates[sortBy] !== "none" || isDifferentColumn) {
      items.sort(function (a, b) {
        const aValue = $(a).find(sortBy).text();
        const bValue = $(b).find(sortBy).text();
  
        if (sortStates[sortBy] === "asc") {
          return aValue.localeCompare(bValue);
        } else {
          return bValue.localeCompare(aValue);
        }
      });
  
      $.each(items, function (index, item) {
        list.append(item);
      });
    } else {

      $.each(originalItemsOrder, function (index, item) {
        list.append(item);
      });
      originalItemsOrder = [];
      lastSortColumn = null;
    }
  }
  
  $(".my-classes__name-sort").on("click", function (e) {
    e.preventDefault();
    sortList.call(this, ".my-classes__name");
  });
  
  $(".my-classes__fault-sort").on("click", function (e) {
    e.preventDefault();
    sortList.call(this, ".my-classes__fault");
  });
  
  $(".my-classes__mark-sort").on("click", function (e) {
    e.preventDefault();
    sortList.call(this, ".my-classes__mark");
  });

// sort end 
// edit

$(document).ready(function() {
  let lastSaveClickTime = 0;

  $('.my-classes__edit').click(function(event) {
    event.preventDefault();
    const $row = $(this).closest('.my-classes__row');
    const $name = $row.find('.my-classes__name');
    const $input = $row.find('.my-classes__input');
    const $editLink = $(this);
    const $saveLink = $row.find('.my-classes__save');

    $name.addClass('hidden');
    $input.val($name.text().trim()).removeClass('hidden').focus();

    if ($(window).width() >= 992) {
      $editLink.addClass('hidden');
      $saveLink.removeClass('hidden');
    }
  });

  $('.my-classes__save').click(function(event) {
    event.preventDefault();
    const currentTime = new Date().getTime();
    if (currentTime - lastSaveClickTime < 300) {
      return;
    }
    lastSaveClickTime = currentTime;

    const $row = $(this).closest('.my-classes__row');
    const $name = $row.find('.my-classes__name');
    const $input = $row.find('.my-classes__input');
    const $editLink = $row.find('.my-classes__edit');
    const $saveLink = $(this);

    $name.text($input.val().trim()).removeClass('hidden');
    $input.addClass('hidden');
    setTimeout(function() {
      $saveLink.addClass('hidden');
      $editLink.removeClass('hidden');
    }, 100); // Затримка 0.3 секунди (300 мілісекунд)
  });

  $('.my-classes__input').on('blur keypress', function(event) {
    if (event.type === 'blur' || (event.type === 'keypress' && event.which === 13)) {
      const $row = $(this).closest('.my-classes__row');
      const $name = $row.find('.my-classes__name');
      const $input = $(this);
      const $editLink = $row.find('.my-classes__edit');
      const $saveLink = $row.find('.my-classes__save');

      $name.text($input.val().trim()).removeClass('hidden');
      $input.addClass('hidden');
      setTimeout(function() {
        $saveLink.addClass('hidden');
        $editLink.removeClass('hidden');
      }, 100); // Затримка 0.3 секунди (300 мілісекунд)
    }
  });

  $('.my-classes__input').on('focusout', function(event) {
    const $row = $(this).closest('.my-classes__row');
    const $name = $row.find('.my-classes__name');
    const $input = $(this);
    const $editLink = $row.find('.my-classes__edit');
    const $saveLink = $row.find('.my-classes__save');

    $name.text($input.val().trim()).removeClass('hidden');
    $input.addClass('hidden');
    setTimeout(function() {
      $saveLink.addClass('hidden');
      $editLink.removeClass('hidden');
    }, 100); // Затримка 0.3 секунди (300 мілісекунд)
  });
});


  // edit end
  // menu
  const myClasses = document.querySelectorAll('.sort');
  let activeElement = null;
  


  function toggleMenu() {
    const menuIcon = document.getElementById('menu-icon');
    const menu = document.getElementById('menu');
  
    menuIcon.classList.toggle('opened');
    menu.classList.toggle('opened');
  }




   const burgerButton = document.querySelector(".header_burger-btn");
   const closeButton = document.querySelector(".main-menu_close-btn");
   const mainMenu = document.querySelector(".main-menu");
 
   burgerButton.addEventListener("click", function () {
     mainMenu.classList.remove("main-menu__hidden");
   });

   closeButton.addEventListener("click", function () {
     mainMenu.classList.add("main-menu__hidden");
   });
  // menu end