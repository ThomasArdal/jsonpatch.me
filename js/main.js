$(document).ready(function() {
    
    // hljs init
    hljs.highlightAll();

    // aos init
    AOS.init({ once: true });

    // CTA
    $("#goToPatchOnDemand").click(function() {
        $('html, body').animate({ scrollTop: $("#section-patch-on-demand").offset().top }, { duration: 800 });
    });
    $("#goToPatchApi").click(function() {
        $('html, body').animate({ scrollTop: $("#section-patch-api").offset().top }, { duration: 800 });
    });

    // Patch on-demand
    $('#patch-json').on("click", function() {

        // reset form
        $('.invalid-feedback').remove();
        $('.is-invalid').removeClass('is-invalid');
        $('.form-group-result').addClass('d-none');
        $('#result-textarea').val('');

        var json_textarea = $('#json-textarea'),
            json_textarea_val = $('#json-textarea').val(),
            patch_textarea = $('#patch-textarea'),
            patch_textarea_val = $('#patch-textarea').val(),
            next = true;

        if(json_textarea_val) {
            if(!IsJsonString(json_textarea_val)) {
                json_textarea.addClass('is-invalid');
                json_textarea.parent().append('<div class="invalid-feedback">Invalid JSON object.</div>');
                next = false;
            }
        } else {
            json_textarea.addClass('is-invalid');
            json_textarea.parent().append('<div class="invalid-feedback">This field is required.</div>');
            next = false;
        }

        if(patch_textarea_val) {
            if(!IsJsonString(patch_textarea_val)) {
                patch_textarea.addClass('is-invalid');
                patch_textarea.parent().append('<div class="invalid-feedback">Invalid JSON object.</div>');
                next = false;
            }
        } else {
            patch_textarea.addClass('is-invalid');
            patch_textarea.parent().append('<div class="invalid-feedback">This field is required.</div>');
            next = false;
        }

        if(!next) return;

        $('.spinner-border').removeClass('d-none');

        setTimeout(function() {
            $.ajax({
                url: "https://api.jsonpatch.me/fullpatch/",
                method: "POST",
                data: JSON.stringify({ "json": JSON.parse(json_textarea_val), "patch": JSON.parse(patch_textarea_val) }),
                contentType: "application/json",
                dataType: "json"
            })
            .done(function(response) {
                $('.spinner-border').addClass('d-none');
                $('.form-group-result').removeClass('d-none');
                $('#result-textarea').val(JSON.stringify(response, null, 4));
            })
            .fail(function (response) {
                $('.spinner-border').addClass('d-none');
                $('.form-group-result').addClass('d-none');
            });
        }, 500);

    });

    // Utils
    function IsJsonString(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }
});