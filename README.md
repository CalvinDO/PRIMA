# Prima
Repository for the module "Prototyping interactive media-applications and games" at Furtwangen University

Calvin Dell'Oro




## Discombobulated Space Station - DSS

- [Pages](https://calvindo.github.io/PRIMA/)

- [Designdokument](https://calvindo.github.io/PRIMA/blob/main/Designdokument.pdf)

- [Scripts & Ressourcen](https://calvindo.github.io/PRIMA/tree/main/Endabgabe/)

- [Zip](https://calvindo.github.io/PRIMA/)

## Lokal 
1. download zip or clone repository via HTTPS/SSH
2. run console command: "npm update"
3. open repository via vs code
4. go to the html file and comment in the out commented 
5. run live server via vs code
6. follow the instructions in game


## Interaktionsanleitung
Beim erstmaligen Klicken auf den Canvas wird der Mauszeiger gesperrt.
Er kann mit dem Mittlerem MouseButton wieder entsperrt werden.

Kamerarotation:
    Mausbewegung nach dem erstem Canvas Klicken

Fortbewegung (!Nicht im Harcoremodus!):
    W,A,S,D -> Vorne, Links, Hinten, Rechts
    SPACE -> Springen (Nur für kleine Unebenheiten nützlich);

Labyrinth-Rotation:
    Q -> Roll Left  (Oder ArrowLeft);
    E -> Roll Right (Oder ArrowRight);
    LeftShift -> Tilt Down (Oder ArrowUp);
    LeftCtrl -> Tilt Up  (Oder ArrowDown);(selten gebraucht, nicht intuitiv)

Dinkelbeere legen:
    F

(Vorsicht! Danger Zone!) Hardcore-Modus aktivieren:
    Toggle in der HTML anklicken



BLENDER IMPORT
    
    Am besten die blend datei aus dem Repo benutzen, um die 9 fundamentalen Elemente nicht erneut bauen zu müssen.
    Diese dann kopieren, und beliebig rotieren.
    Mesh-Verschiebungen im Edit Mode sollten vermieden werden.


    !WICHTIG!

    In Blender:

    !Die zu exportierenden Elemente auswählen, Shortcut A für alle Elemente in der Szene
        
         File
            -> Export
                    -> Collada (Default)(.dae)
                            -> Es öffnet sich ein Einstellungsfenster.
                                |
                                v
                                Main -> "Selection Only" - Check
                                     -> Global Orientation 
                                            |
                                            v
                                            "Apply" - Check
                                            Forward Axis -> -Z
                                            Up Axis      ->  Y
                                     -> Texture Options:
                                            "Copy" -Uncheck
                                Geom -> "Triangulate" - Uncheck
                                     -> Transform -> Decomposed   !!NICHT MATRIX WICHTIG!!
                                Anim -> "Include Animation" - Uncheck

                                => Export Collada

    Die exportierte File in den Endabgabe Ordner stecken, am besten die alte elements.dae mit gleichem Namen ersetzen.





