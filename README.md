# Prima
Repository for the module "Prototyping interactive media-applications and games" at Furtwangen University

Calvin Dell'Oro




## Discombobulated Space Station - DSS

- [Pages](https://calvindo.github.io/PRIMA/)

- [Designdokument](https://github.com/CalvinDO/PRIMA/blob/main/Designdokument.pdf)

- [Scripts & Ressourcen](https://github.com/CalvinDO/PRIMA/tree/main/Endabgabe/)

- [Rar](https://github.com/CalvinDO/PRIMA/blob/main/DiscombobulatedSpaceStation.rar)

## Lokal starten
1. Repository mit HTTPS/SSH clonen oder die Zip herunterladen
3. Repository in VSC Öffnen
4. Bei allen Ressourcen Links (Script, dae, audio, json, css, usw.) die root /PRIMA/ entfernen
5. Auf der HTML seite 
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
    Der Charakter startet bei Position (0, 0, 0), deswegen sollte sich der gewünschte Start im Labyrinth auch an dieser Stelle befinden.

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





