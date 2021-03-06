// Instructions
// ----------------------------
// Get data from http://sponsor.hackmit.org page via JSON.stringify($R)
// Go to http://manage.devpost.com/challenges/2924-hackmit-2015/edit?form=prizes (or replace "2924-hackmit-2015" with whatever)
// set `data = `copy pasted from your stringified JSON``
data = [] 

// paste this into browser
// note: will kill all current entries

(function() {
    if ($(".destroy").length > 0) {
        confirm = function() {return true};
        $('.destroy').click();
    }

    setTimeout(function() {
        all_prizes = [];
        for (var i = 0 ; i < data.length; i++) {
            var prizes = data[i].prizes;
            for (var j = 0; j < prizes.length; j++) {
                var prize = prizes[j];
                all_prizes.push(prize);
            }
        }

        function is_string_valid(s) {
            return (s !== undefined && typeof (s) == 'string' && s.length > 0)
        }

        function is_obj_valid(o) {
            return (o != undefined && ('title' in o) && ('description' in o))
        }

        var failed = [];

        function do_form() {
            var prize = this.pop();
            if (is_obj_valid(prize) && is_string_valid(prize.title)) {
                if (!is_string_valid(prize.description)) {
                    prize.description = "{{fill in}}";
                }

                prize.description = prize.description + "\n\n" + JSON.stringify(prize);

                var t = this;
                $(".clearfix > .blue").click();
                setTimeout(function() {
                    if (is_string_valid(prize.title) && is_string_valid(prize.description)) {
                        $("#prize_name").val(prize.title);
                        $("#prize_value").val("420");
                        $("#prize_winners").val("1");
                        $("#prize_description").val(prize.description);
                        $(".actions > input").click();
                    }
                    setTimeout(function() {
                        do_form.apply(t);
                    }, 500);
                }, 500);
            }
            else {
                setTimeout(function(){
                    failed.push(prize);
                    console.log("failed: " + JSON.stringify(prize));
                    if (this.length > 0) {
                        do_form.apply(this);
                    }  
                }, 500);
            }
        }

        do_form.apply(all_prizes);
    }, 5000);
})()
