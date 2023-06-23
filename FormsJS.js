
$(document).ready(function(){
    waitForWrapperRenderForLang();
});

function changeLang(){
    var lang = localStorage.getItem("selected_language")
    if (lang == "ar-SA") {
        $(".row:has(div[name*=Card])").css("flex-direction", "row-reverse");
    } else {
        $(".row:has(div[name*=Card])").css("flex-direction", "row");
    }
    }
    function waitForWrapperRenderForLang() {
        var s = $('.dd-container'); if (s.length > 0) {
            $(".dd-container a").on("click", () => changeLang())
            setTimeout(() => {
                $(".dd-selected").trigger("click")
                $(".dd-selected").trigger("click")
            }, 500);
        } else { setTimeout(waitForWrapperRenderForLang, 300); }
    }
