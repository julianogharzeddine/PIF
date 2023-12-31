var dictionary;

$(document).ready(function () {

    $(document).click(function () {
        translate()
    })


    let LSLang = localStorage.getItem('selected_language')


    if (LSLang == null || LSLang == 'undefined') {
        localStorage.setItem('selected_language', 'ar-SA')
    }

    let LSLang1 = localStorage.getItem('selected_language')

    switch (LSLang1) {
        case 'en-US':

            $("a.dd-option label.dd-option-text:contains('Arabic')").click();
            $("a.dd-option label.dd-option-text:contains('English')").click();
            break
        case 'ar-SA':
            $("a.dd-option label.dd-option-text:contains('Arabic')").click();
            break
        case 'fr-FR':
            $("a.dd-option label.dd-option-text:contains('Arabic')").click();
            $("a.dd-option label.dd-option-text:contains('Français')").click();
            break
        default:
            $("a.dd-option label.dd-option-text:contains('Arabic')").click();
            break
    }

    // Translating the Page On Load

    dictionary = [
        { "English": "New", "Arabic": "الجديدة", "French": "Nouveau" },
        { "English": "Active", "Arabic": "النشطة", "French": "Actif" },
        { "English": "Completed", "Arabic": "المكتملة", "French": "Terminé" },
        { "English": "Created By", "Arabic": "انشا من قبل", "French": "Créé Par" },
        { "English": "Status", "Arabic": "الحالة", "French": "Statut" },
        { "English": "Subject", "Arabic": "الموضوع", "French": "Sujet" },
        { "English": "Purchase", "Arabic": "طلب شراء", "French": "Achat" },
        { "English": "Sales", "Arabic": "المبيعات", "French": "Ventes" },
        { "English": "Marketing", "Arabic": "التسويق", "French": "Marketing" },
        { "English": "Requisitions", "Arabic": "الطلبات", "French": "Demandes" },
        { "English": "Our Services", "Arabic": "خدماتنا المختلفة", "French": "Nos Services" },
        { "English": "out of", "Arabic": "من", "French": "de" },
        { "English": "Purchase No", "Arabic": "رقم الطلب", "French": "Numero" },
        { "English": "Today", "Arabic": "اليوم", "French": "Auj" },
        { "English": "Wed", "Arabic": "الأربعاء", "French": "Mer" },
        { "English": "Thu", "Arabic": "الخميس", "French": "Jeu" }
       

    ];


    // Wait for the card-wrapper div to render successfully

    setTimeout(function () {
        renderLegalServicesCards()
    }, 2000)


    // Creating Notification Icon

    createNotificationIcon()



    $(document).on('click', '#makePurchase', function () {
        window.open("https://srv-k2five/Runtime/Runtime/Form/PO.SubmitForm/")
    })

    // Showing all the investigations in the custom cards

    $(document).on('click', '#showAllInvestigations', function () {
        $("[name='showAllInvestigations hiddenButton']").trigger('click')

        // Creating the request counters
        createReqCounters()

        // Hiding the custom cards

        $('#card-wrapper').css('visibility', 'visible')
        $('#card-wrapper').css('height', 'fit-content')

        renderInvestCards()

    })

    // Hiding everything else when showing tasks

    $('[name="MyTasks ButtonNoBorder"]').click(function () {
        $('#card-wrapper').css('visibility', 'hidden')
        $('#card-wrapper').css('height', '0')
    })

    $('[name="Text Box"]').on("input", function () {
        setTimeout(function () {
            renderInvestCards()
        }, 1000)

    })

    $(document).on('click', '#bellicon', function () {
        $('#dropdownContent').toggle()
    });

})


function createNotificationIcon() {
    $('.taskDD').remove()
    $('body').append(`<div class="taskDD">
<div>
  <div id="notificationCounter">
    <p id="redCircle">3</p>
  </div>
  <img id="bellicon" src="https://srv-k2five/designer/Image.ashx?ImID=170283">
</div>

<div id="dropdownContent" style="/* margin-top: 3px; */">
  <a href="https://srv-k2five/Runtime/Runtime/Form/PurchaseRequisition.ReveiwForm/?SerialNo=41381_9&ServiceID=ab1a44db-1147-49c0-9085-5479ab84cf6d" target="_self">
    <div class="date-icon translatable" style="background-color: #0066cc;">اليوم</div>
    <div class="task-details">
      <h4>Check stock availability</h4>
      <p>PR - 001005</p>
    </div>
  </a>
  <a href="https://srv-k2five/Runtime/Runtime/Form/PurchaseRequisition.ReveiwForm/?SerialNo=41381_9&ServiceID=ab1a44db-1147-49c0-9085-5479ab84cf6d" target="_self">
    <div class="date-icon translatable" style="background-color: #0066cc;">الأربعاء</div>
    <div class="task-details">
      <h4>PR-SoW</h4>
      <p>PR - 001002</p>
    </div>
  </a>
  <a href="https://srv-k2five/Runtime/Runtime/Form/PurchaseRequisition.ReveiwForm/?SerialNo=41381_9&ServiceID=ab1a44db-1147-49c0-9085-5479ab84cf6d" target="_self">
    <div class="date-icon translatable" style="background-color: #0066cc;">الخميس</div>
    <div class="task-details">
      <h4>Request necessary approvals</h4>
      <p>PR - 001003</p>
    </div>
  </a>
</div>
</div>`)

}

function goTo(href) {
    window.open(href, "_self")
}

function renderInvestCards() {
    var cardWrapper = $("#card-wrapper");
    if (cardWrapper.length === 0) {
        var gridBody = $('div[name="RequestsInventory"]');
        $('<div id="card-wrapper"></div>').insertAfter(gridBody);
        cardWrapper = $("#card-wrapper");
    }

    cardWrapper.html("")
    var rowObjects = fetchRowValues();


    rowObjects.forEach(function (row) {

        var creatorName = row[0] !== undefined ? row[0] : '';
        var creationDate = row[1] !== undefined ? row[1] : '';
        var investStatus = row[2] !== undefined ? row[2] : '';
        var subject = row[3] !== undefined ? row[3] : '';
        var investNo = row[4] !== undefined ? row[4] : '';
        var statusColor = row[5] !== undefined ? row[5] : '';

        cardWrapper.append(`
        <div class="cardItem">
          <div class="cardHeader">
          <div class="investNoStatusWrap">
          <div class="status" style="background-color: ${statusColor};"></div>
            <div class="investNo"><a>${investNo}</a></div>
          </div>
          <div class='dateWrapper'> 
          <div class="date">${creationDate}</div>
          <img src='https://srv-k2five/designer/Image.ashx?ImID=170289' />
          </div>
          </div>
          <div class="cardBody">
            <div class="card-rows">
              <p class="reqCreator labelVal">${creatorName}</p>
              <p class="reqCreatorLabel labelTitle translatable">انشا من قبل</p>
            </div>
            <div class="card-rows">
              <p class="reqCreator labelVal">${investStatus}</p>
              <p class="reqCreatorLabel labelTitle translatable">الحالة</p>
            </div>
            <div class="card-rows">
              <p class="reqSubject labelVal">${subject}</p>
              <p class="reqSubjectLabel labelTitle translatable">الموضوع</p>
            </div>
          </div>
        </div>
      `);
    });
}

function fetchRowValues() {

    let rowObjects = []

    let rows = $('div[name="RequestsInventory"]').find('.grid-body-content').find('.grid-content-table').find('tbody').find('tr')

    rows.each(function () {

        let tds = $(this).find('td').find('.runtime-list-item-wrap')
        let emptyObj = {}
        let index = 0

        tds.each(function () {

            if ($(this).text() == ".") {
                emptyObj[index] = $(this).css("background-color")
            } else {
                emptyObj[index] = $(this).text()
            }

            index++
        })

        rowObjects.push(emptyObj)
    })

    return rowObjects
}

function fetchReqStatuses() {

    let activeNo = $("span[name='Active']").text()
    let newNo = $("span[name='New']").text()
    let completedNo = $("span[name='Completed']").text()

    $("span[name='Active']").css("visibility", "hidden !important");
    $("span[name='New']").css("visibility", "hidden !important");
    $("span[name='Completed']").css("visibility", "hidden !important");


    return [activeNo, newNo, completedNo]
}

function createReqCounters() {

    let [activeNo, newNo, completedNo] = fetchReqStatuses()
    let totalcounter = $("[name='Count Data Label']").text();
    let content = `
  <div class="Complete counterCard">
      <p id="completeCounter" class="counterCircle">${completedNo}</p>
      <p class="counterLabel translatable">المكتملة</p>
      <p class="totalcounter"><span class='translatable'>من </span> ${totalcounter}</p>
  </div>
  <div class="Active counterCard">
      <p id="activeCounter" class="counterCircle">${activeNo}</p>
      <p class="counterLabel translatable">النشطة</p>
      <p class="totalcounter"><span class='translatable'>من </span> ${totalcounter}</p>
  </div>
  <div class="New counterCard">
      <p id="newCounter" class="counterCircle">${newNo}</p>
      <p class="counterLabel translatable">الجديدة</p>
      <p class="totalcounter"><span class='translatable'>من </span> ${totalcounter}</p>
  </div>
  `
    $("#reqCounter").html("")
    $("#reqCounter").append(content)
}

function renderLegalServicesCards() {
    $('#legalservices-card-wrapper').html("")
    $('#legalservices-card-wrapper').append(`
    <div class="cardItem" id='makePurchase'>
    <img src="https://cdn.jsdelivr.net/gh/julianogharzeddine/PIF@main/purchase.jpg" class='titleImage'>
    <p class="cardTitle translatable">طلب شراء</p>
</div>
<div class="cardItem">
    <img src="https://cdn.jsdelivr.net/gh/julianogharzeddine/PIF@main/sales.jpg" class='titleImage'>
    <p class="cardTitle translatable">المبيعات</p>
</div>
<div class="cardItem">
    <img src="https://cdn.jsdelivr.net/gh/julianogharzeddine/PIF@main/marketing.jpg" class='titleImage'>
    <p class="cardTitle translatable">التسويق</p></div>
<div class="cardItem" id='showAllInvestigations'>
    <img src="https://cdn.jsdelivr.net/gh/nourkhansa20/CustomFiles@main/pexels-photo.jpg" class='titleImage'>
    <p class="cardTitle translatable">الطلبات</p></div>
  `)
}

function waitForLegalWrapperRender() {
    if ($("[name='LegalServicesDL']").length > 0) {
        // Call your function here
        renderLegalServicesCards()
    } else {
        // Retry after a delay
        setTimeout(waitForLegalWrapperRender, 200);
    }
}


function translate() {
    let LSLang = localStorage.getItem('selected_language')
    let targetLang = ""

    switch (LSLang) {
        case 'en-US':
            targetLang = 'English'
            $('[name="Sidebar"]').css('right', '')
            $('[name="Sidebar"]').css('left', '0')
            $('.runtime-form').css('left', '')
            $('.runtime-form').css('left', '20%')
            $('.counterCard').css('flex-direction', 'row-reverse')
            $('.dateWrapper').css('flex-direction', 'row-reverse')
            $('.card-rows').css('flex-direction', 'row-reverse')
            $('.cardHeader').css('flex-direction', 'row')
            $('.investNoStatusWrap').css('flex-direction', 'row')
            $('#legalservices-card-wrapper').css('direction', 'ltr')
            $('#card-wrapper').css('direction', 'ltr')
            $('.taskDD a').css('flex-direction', 'row')
            $('.task-details p').css({
                'text-align': 'left',
                'direction': 'rtl'
            })
            $(".task-details h4").css("text-align", "left")
            break
        case 'ar-SA':
            targetLang = 'Arabic'
            $('[name="Sidebar"]').css('left', '')
            $('[name="Sidebar"]').css('right', '0')
            $('[name="Sidebar"]').css('left', '')
            $('.runtime-form').css('left', '5%')
            $('.counterCard').css('flex-direction', 'row-reverse')
            $('.dateWrapper').css('flex-direction', 'row')
            $('.card-rows').css('flex-direction', 'row-reverse')
            $('.cardHeader').css('flex-direction', 'row')
            $('.investNoStatusWrap').css('flex-direction', 'row')
            $('#legalservices-card-wrapper').css('direction', 'rtl')
            $('#card-wrapper').css('direction', 'rtl')
            $('.taskDD a').css('flex-direction', 'row-reverse')
            $('.task-details p').css({
                'text-align': 'right',
                'direction': 'ltr'
            })
            $(".task-details h4").css("text-align", "right")
            break
        case 'fr-FR':
            targetLang = 'French'
            $('[name="Sidebar"]').css('right', '')
            $('[name="Sidebar"]').css('left', '0')
            $('.runtime-form').css('left', '')
            $('.runtime-form').css('left', '20%')
            $('.counterCard').css('flex-direction', 'row-reverse')
            $('.card-rows').css('flex-direction', 'row-reverse')
            $('.cardHeader').css('flex-direction', 'row')
            $('.dateWrapper').css('flex-direction', 'row')
            $('#legalservices-card-wrapper').css('direction', 'ltr')
            $('#card-wrapper').css('direction', 'ltr')
            $('.taskDD a').css('flex-direction', 'row')
            $('.task-details p').css({
                'text-align': 'left',
                'direction': 'rtl'
            })
            $(".task-details h4").css("text-align", "left")
            break
    }

    let toTranslate = $('.translatable')

    toTranslate.each(function () {
        $(this).text(getFromDictionary(($(this).text().trim()), targetLang))
    })

}

function getFromDictionary(text, toLanguage) {
    for (var i = 0; i < dictionary.length; i++) {

        var entry = dictionary[i];

        if (entry.English === text) return entry[toLanguage];
        if (entry.Arabic === text) return entry[toLanguage];
        if (entry.French === text) return entry[toLanguage];

    }

    return 'Translation not found';
}

function renderTasks() {

    var htmlSnippet = ""

    tasks.forEach(function (task) {
        var taskHtml = '<a href="task' + task.id + '.html" target="_self">' +
            '<div class="date-icon" style="background-color: ' + task.color + ';">' +
            task.date.ar + '</div>' +
            '<div class="task-details"><h4>' + task.title.ar + '</h4><p>ID: ' +
            task.id + '</p></div></a>';
        htmlSnippet += taskHtml;
    });

    $('#myDropdown').append(htmlSnippet)
}
