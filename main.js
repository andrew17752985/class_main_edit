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




   const burgerButton = document.querySelector(".header_burger-btn");
   const closeButton = document.querySelector(".main-menu_close-btn");
   const mainMenu = document.querySelector(".main-menu");
 
   burgerButton.addEventListener("click", function () {
     mainMenu.classList.remove("main-menu__hidden");
   });

   closeButton.addEventListener("click", function () {
     mainMenu.classList.add("main-menu__hidden");
   });



   function calculateTotalTime() {
    const timeLogs = [
      { start: "19:58", end: "20:13" },
      { start: "20:43", end: "21:08" },
      { start: "16:00", end: "17:20" },
      { start: "21:27", end: "23:36" },
      { start: "10:09", end: "10:42" },
      { start: "11:58", end: "13:00" },
      { start: "13:40", end: "15:03" },
      { start: "17:40", end: "19:03" },
      { start: "21:05", end: "00:32" },
      { start: "22:00", end: "00:00" },
      { start: "22:39", end: "23:15" },
      { start: "22:36", end: "23:00" },
    ];
  
    let totalMinutes = 0;
  
    for (const timeLog of timeLogs) {
      const [startHour, startMinute] = timeLog.start.split(":").map(Number);
      const [endHour, endMinute] = timeLog.end.split(":").map(Number);
  
      let durationMinutes = (endHour * 60 + endMinute) - (startHour * 60 + startMinute);
  
      if (durationMinutes < 0) {
        durationMinutes += 24 * 60;
      }
  
      totalMinutes += durationMinutes;
    }
  
    const totalHours = Math.floor(totalMinutes / 60);
    totalMinutes %= 60;
  
    alert(`Загальний час, витрачений на завдання: ${totalHours} годин ${totalMinutes} хвилин.`);
  }
  
  calculateTotalTime();