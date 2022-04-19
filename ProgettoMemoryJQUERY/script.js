$(document).ready( main );

        function main()
        {   
            preparaSchema();
        }

        function preparaSchema()
        {         
            let immagini = ["arrabbiato.png", "bello.png", "piangere.png", "ridere.png", "amare.png", "amare1.png", "spavento.png", "shock.png", "arrabbiato.png", "bello.png",
            "piangere.png", "ridere.png", "amare.png", "amare1.png", "spavento.png", "shock.png"];
            mischia_immagini();

            for (let i=0; i<16; i++)
            {
                let src_immagine = " src='img/" + immagini[i] + "'";
                let img = "<img " + src_immagine +  "/>";
                
                let id_div = "id= 'div" + i + "'";
                let stato_div = " stato = 'coperta'";

                $("#struttura").append("<div " + id_div + 
                                       stato_div + " class='carta'>" + img + "</div>");
            }

            $('.numclicks').bind('click', function(){
                var num = 0;
                num += 1;
                $(this).val("numero di click: " + num);
                });
            
            $("div>img").fadeToggle();

            let conta_carte = 16;

            
            let id_prima_carta = "nessuna";

        
            $("#struttura>div").on("click", voltaCarta);

            function voltaCarta()
            {
              let selettore_questa_carta = "#"+this.id;          
              let selettore_prima_carta = "#"+id_prima_carta;

          
              if ($(selettore_questa_carta).attr("stato") === "indovinata"
              || selettore_prima_carta===selettore_questa_carta)
              {return;}
              
              $(selettore_questa_carta+">img").fadeToggle(500); 
              
              if (id_prima_carta==="nessuna") 
              {            
              
                id_prima_carta = this.id;
              }
              else 
              {           
               
                if ( $(selettore_questa_carta+">img").attr("src") ===
                      $(selettore_prima_carta+">img").attr("src") )
                {
                
                  $(selettore_questa_carta).attr("stato", "indovinata");
                  $(selettore_prima_carta).attr("stato", "indovinata");

             
                  id_prima_carta = "nessuna";

                  conta_carte -= 2;
                  if (conta_carte === 0)
                  {
                    $("#vittoria").css('visibility', 'visible');
                  }


                }
                else     
                {
                  
                  $(selettore_prima_carta+">img").fadeToggle(500).delay(1000);
                  $(selettore_questa_carta+">img").fadeToggle(500);

                  $(selettore_questa_carta).attr("stato", "coperta"); 
                  $(selettore_prima_carta).attr("stato", "coperta"); 

                  id_prima_carta = "nessuna";
                }
              }
            }

            function mischia_immagini()
            {
              for (let i=1; i<=8; i++)
              { 
                immagini.push("img"+i+".png");
                immagini.push("img"+i+".png");
              }

              for (let i=0; i<100; i++)
              {
                let pos_carta1 = Math.trunc( Math.random() * 16);
                let pos_carta2 = Math.trunc( Math.random() * 16);

                if (pos_carta1 !== pos_carta2)
  	  	        {
                  let temp = immagini[pos_carta1];
                  immagini[pos_carta1] = immagini[pos_carta2];
                  immagini[pos_carta2] = temp;  
                }
              }
            }            

        }

