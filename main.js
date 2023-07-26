'use strict';
$(document).ready(function () {
  const myClasses = $(".sort");
  let activeElement = null;

  function removeActiveClass() {
    if (activeElement) {
      activeElement.removeClass('active');
    }
  }

  if ($(window).width() <= 991) {
    myClasses.on('click', function (e) {
      removeActiveClass();
      $(this).addClass('active');
      activeElement = $(this);
    });

    $(".my-classes__edit").on('click', function (e) {
      e.stopPropagation();
      removeActiveClass();
    });

    $(".my-classes__delete").on('click', function (e) {
      e.stopPropagation();
      removeActiveClass();
    });
  }
});

   // Збережемо поточний порядок сортування для кожного стовпця
  // Збережемо стан до сортування для кожного стовпця
  const sortStates = {
    ".my-classes__name": "none",
    ".my-classes__fault": "none",
    ".my-classes__mark": "none",
  };
  
  let originalItemsOrder = [];
  let lastSortColumn = null; // Зберігаємо ім'я останнього обраного стовпця сортування
  
  function sortList(sortBy) {
    const list = $(".my-classes__list");
    const items = list.children(".sort").get();
  
    if (originalItemsOrder.length === 0) {
      originalItemsOrder = items.slice(0);
    }
  
    // Перевірка, чи клікнули на інший стовпець сортування
    const isDifferentColumn = lastSortColumn !== sortBy;
    lastSortColumn = sortBy;
  
    // Визначаємо наступний стан сортування для поточного стовпця
    if (sortStates[sortBy] === "none") {
      sortStates[sortBy] = "asc";
    } else if (sortStates[sortBy] === "asc") {
      sortStates[sortBy] = "desc";
    } else {
      sortStates[sortBy] = "none";
    }
  
    // Змінимо класи для <svg> іконки відповідно до стану сортування
    $(".my-classes__sort").removeClass("sorted-asc sorted-desc");
  
    const icon = $(this).find(".my-classes__sort");
    if (sortStates[sortBy] === "asc") {
      icon.addClass("sorted-asc");
    } else if (sortStates[sortBy] === "desc") {
      icon.addClass("sorted-desc");
    }
  
    // Виконуємо сортування тільки якщо стан сортування не "none" або якщо клікнули на інший стовпець сортування
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
      // Якщо стан сортування "none" і клікнули на той же стовпець сортування, відновлюємо оригінальний порядок
      $.each(originalItemsOrder, function (index, item) {
        list.append(item);
      });
      originalItemsOrder = [];
      lastSortColumn = null; // Очищуємо ім'я останнього обраного стовпця сортування
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



  $(document).ready(function() {
    $('.my-classes__edit').click(function(event) {
      event.preventDefault();
      const $row = $(this).closest('.my-classes__row');
      const $name = $row.find('.my-classes__name');
      const $input = $row.find('.my-classes__input');
      $name.addClass('hidden');
      $input.val($name.text().trim()).removeClass('hidden').focus();
    });
  
    $('.my-classes__input').on('blur keypress', function(event) {
      if (event.type === 'blur' || (event.type === 'keypress' && event.which === 13)) {
        const $row = $(this).closest('.my-classes__row');
        const $name = $row.find('.my-classes__name');
        const $input = $(this);
        $name.text($input.val().trim()).removeClass('hidden');
        $input.addClass('hidden');
      }
    });
  });
  
  const myClasses = document.querySelectorAll('.sort');
  let activeElement = null;
  


  function toggleMenu() {
    const menuIcon = document.getElementById('menu-icon');
    const menu = document.getElementById('menu');
  
    menuIcon.classList.toggle('opened');
    menu.classList.toggle('opened');
  }