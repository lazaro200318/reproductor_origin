window.onload = function() {
    var file = document.getElementById("thefile")
    var audio = document.getElementById("audio")

    file.onchange = function () {
       var files = this.files;
       audio.src = URL.createObjectURL(files[0])
       audio.load();
       audio.play()
       
       //frecuencia audio 
       var context = new AudioContext();
       var src = context.createMediaElementSource(audio);
       var analyser = context.createAnalyser();
        
       src.connect(analyser);
       analyser.connect(context.destination)

       analyser.fftSize= 2048; 

       var bufferLenght = analyser.frequencyBinCount;
       var dataArray = new Uint8Array(bufferLenght);


       //canvas
       var canvas = document.getElementById("canvas");
       canvas.width = window.innerWidth;
       canvas.height = window.innerHeight;
       var ctx = canvas.getContext("2d");

       var WIDTH = canvas.width;
       var HEIGHT = canvas.height;

       var barWidth = (WIDTH / bufferLenght) * 2.5;
       var barHeight;
       var x = 0;

        function render(){
            requestAnimationFrame(render);
            x = 0

            ctx.fillStyle = "#000"
            ctx.fillReact(0, 0, WIDTH, HEIGHT)

            analyser.getByteFrequencyData(dataArray);
            for (var i = 0; i < bufferLenght; i++){
               barHeight = dataArray[i];
             
                var r = barHeight + (25 * (i / bufferLenght));
                var g = 250 * bufferLenght;
                ctx.fillStyle = `rgb(${r}, ${g}, 123)`
                ctx.fillReact(x, HEIGHT - barHeight, barWidth, barHeight)

                x += barWidth + 1
            }

        }

       audio.play()
       render();
        



    }
    
}