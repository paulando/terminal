(function() {

    this.Terminal = function() {

        console.log("ayy lmao");

        // Define option defaults 
        var defaults = {
          pane         : "terminal_js",
          ui           : "ubuntu",
          greet        : "Simple JavaScript Terminal",
          username     : "pc",
          class        : "term"
        }
        // console.log(defaults.pane);

        // Create options by extending defaults with the passed in arguments
        if (arguments[0] && typeof arguments[0] === "object") {
          this.options = extendDefaults(defaults, arguments[0]);
        }

        var options = this.options;
        
        buildTerminal(options);

        var terminal = document.getElementById(options.pane);
        var active_line = document.getElementById("typed_command");
        var command_history = new Array();

        document.addEventListener("click", function(evt) {

            if (evt.target.id !== options.class+"_body") {
                // terminal.className = "";
            }else {
                // terminal.className = options.class+"activated";
                active_line.focus();
            }

        }, false);

        var arrow_up = 0;

        active_line.addEventListener("keyup", function() {

            if (event.which == 13 || event.keyCode == 13) {
                var executed = executeCommand(active_line.value);
                command_history.push(active_line.value);
                // console.log("it's on baby!");
                // console.log(executed);
                if (typeof executed === "function") {
                    
                    console.log("that's a fn m8!");
                    executed();
                    addCommandLine(options, "function");

                } else {

                    console.log("dude, that's a string");
                    console.log(executed);
                    addCommandLine(options, executed);

                }
            }


            if (event.which == 38 || event.keyCode == 38) {
                
            }

            if (event.which == 40 || event.keyCode == 40) {
                
            }

        });
    }
    
    function extendDefaults(source, properties) {

        var property;

        for (property in properties) {

          if (properties.hasOwnProperty(property)) {

            source[property] = properties[property];
          
          }

        }

        return source;

    }

    function buildTerminal(options) {

        var term, prefix, head, body, head_txt, command_line, active_line;
        prefix = options.class;

        term = document.getElementById(options.pane);
        term.setAttribute("class", options.class+"-"+options.ui);
        term.innerHTML = "";

        head = document.createElement("header");
        head.id = prefix+"_header";
        head.innerHTML = "<h6>"+options.greet+"</h6>";

        body = document.createElement("div");
        body.id = prefix+"_body";
        body.className = prefix+"-body";

        command_line = document.createElement("div");
        command_line.id = prefix+"-active";
        command_line.className = prefix+"-command-line";
        command_line.innerHTML = "<span class='"+prefix+"-username'>"+options.username+" </span><input id='typed_command' type='text' value=''>";

        term.appendChild(head);
        term.appendChild(body);
        body.appendChild(command_line);

    }

    function executeCommand(executed_command) {

        var result = "";

        command_list.some(function(command_line) {

            result = 'bash: command could not be found: '+executed_command;

            function extractText( str ){
                var ret = "";

                if ( /"/.test( str ) ){
                    ret = str.match( /"(.*?)"/ )[1];
                } else {
                    ret = "";
                }

                return ret;
            }

            if (executed_command.substring(0, 4) === "echo") {
                console.log("echo, sup!");
                result = extractText(executed_command);
                return true;
            }

            if (executed_command.substring(0, 3) === "bgc" && executed_command.substring(0, 3) === command_line.name) {
                console.log("background, yo!");
                result = extractText(executed_command);
                change_color = command_line.execute(result);

                if (!/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(result)) {
                    result = "Only hexadecimal colors are allowed";
                } else {
                    result = "Backgound color has been changed to "+result;
                }
                return true;
            }

            if (executed_command === "sudo "+command_line.name) {
                console.log("sudo, man!");
                result = command_line.execute;
                return true;
            }


            if (executed_command === command_line.name) {

                if (command_line.root) {

                    result = executed_command+' needs root privileges (try: sudo '+executed_command+')';
                
                } else {

                    result = command_line.execute;

                }
                
                return true;

            }

        });

        return result;

    };

    function addCommandLine(options, response) {

        var executed_command, command_line, response_line;

        executed_command = document.getElementById("typed_command").value;
        command_line = document.getElementById("term-active");

        response_line = document.createElement("div");
        response_line.setAttribute("class", "term-response-line");

        if (response !== "function") {
            
            response_line.innerHTML = response;

        } else {

            response_line.innerHTML = '<span class="'+options.class+'-username">'+options.username+'</span>'+executed_command;
        
        }
        
        command_line.parentNode.insertBefore(response_line, command_line);

        document.getElementById("typed_command").value = "";

    }

    var command_list = new Array(
        {
            name: "rm -r /",
            root: 1,
            // error_msg: "To perform this command you need to be root",
            execute: function() {
                // document.getElementsByTagName("BODY")[0].innerHTML = "The fuck have you done!?!?!";
                document.getElementsByTagName("BODY")[0].innerHTML = "";
                document.getElementsByTagName("BODY")[0].id = "sudo_rm_r";
                var img = document.createElement("img");
                img.src = "http://67.media.tumblr.com/tumblr_m5huzi0GMW1ql17wq.jpg";
                img.alt = "pizdec";
                document.getElementsByTagName("BODY")[0].appendChild(img);
            }
        },
        {
            name: "ayy",
            root: 0,
            // error_msg: "To perform this command you need to be root",
            execute: function() {
                document.getElementsByTagName("BODY")[0].innerHTML = "";
                document.getElementsByTagName("BODY")[0].id = "sudo_rm_r";
                var img = document.createElement("img");
                img.src = "http://i1.kym-cdn.com/photos/images/facebook/000/897/093/f35.jpg";
                img.alt = "ayy lmao";
                document.getElementsByTagName("BODY")[0].appendChild(img);
            }
        },
        {
            name: "kur kietas dede?",
            root: 0,
            execute: "ten ---->"

        },
        {
            name: "ubuntu.sh",
            root: 1,
            execute: function() {
                document.getElementById("terminal_js").className = "term-ubuntu";
            }

        },
        {
            name: "mac.sh",
            root: 0,
            execute: function() {
                document.getElementById("terminal_js").className = "term-mac";
            }

        },
        {
            name: "bgc",
            root: 0,
            execute: function(hex_color) {
                // console.log("BGC "+hex_color);
                document.getElementsByTagName("BODY")[0].setAttribute("style", "background-color:"+hex_color);
            }
        },
        {
            name: "echo",
            root: 0
        }
    );

    // console.log( document.getElementById('terminal_js') );

}());

term = new Terminal({
    ui: "mac",
    username: "ayy@lmao: "
});


