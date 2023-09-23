var express = require("express");

var path = require("path"); var bodyParser = require("body-parser");

var compiler = require("compilex");

var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser());

var option = { stats: true };

compiler.init(option);

app.get("/", function (req, res) {

    res.sendfile(__dirname + "/index.html");

});

app.post("/compilecode", function (req, res) {

    var code = req.body.code;

    var input = req.body.input;

    var inputRadio = req.body.inputRadio;

    var lang = req.body.lang;

    if (lang === "c") {

        if (inputRadio === "true") {

            var envData = { OS: "windows", cmd: "g++", options: { timeout: 10000 } };
            compiler.compileCPP(envData, code, function (data) {

                res.send(data);

                //data.error = error message

                //data.output = output value

            });

        }

    }
    if (lang === "Python") {

        if (inputRadio === "true") {

            var envData = { OS: "windows" };
            compiler.compilePythonWithInput(envData, code, input, function (data) {
                res.send(data);
            });

        } else {

            var envData = { OS: "windows" };

            compiler.compilePython(envData, code, function (data) {

                res.send(data);

            });
        }
    }
    const php = require('node-php');
    const { exec } = require('child_process');
    if (lang === "PHP") {
        const phpCode = `
            <?php
            // Your PHP code here
            echo "Hello, PHP!";
            ?>
        `;
    
        const fs = require('fs');
    const tmpFile = 'temp.php';
    
    fs.writeFileSync(tmpFile, phpCode);

    // Execute the PHP script using the PHP interpreter
    exec(`php ${tmpFile}`, (error, stdout, stderr) => {
        if (error) {
            res.send("Error: " + error.message);
            return;
        }
        if (stderr) {
            res.send("Error: " + stderr);
            return;
        }
        res.send("PHP Output: " + stdout);
    });
    } else {
        // Handle other languages or provide an error response
        res.send("Unsupported language: " + lang);
    }
    

    if (lang === "Java") {
        if (inputRadio === "true") {
            var envData = { OS: "windows" };
            compiler.compileJavaWithInput(envData, code, input, function (data) {
                res.send(data);
            });
        } else {
            var envData = { OS: "windows" };
            compiler.compileJava(envData, code, function (data) {
                res.send(data);
            });
        }
    } 
    function executeCode() {
        $.ajax({
        url: "Users\KHUSHI CHAUHAN",
        method: "POST",
        data: { Language: $("#languages").val(), 
        code: editor.getSession().getValue()
        },
        success: function(response) { 
            $(output).text(response)
        }
        })
        }
    });

  

app.get("/fullStat", function (req, res) {

    compiler.fullstat(function (data) {

        res.send(data);

    });

});

app.listen(8080);

compiler.flush(function () {

    console.log("All temporary files flushed !");

});

