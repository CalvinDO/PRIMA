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
5. Auf der HTML Seite den Live Server starten
6. In den Canvas klicken


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





## Checkliste für Leistungsnachweis
© Calvin Dell'Oro

| Nr | Bezeichnung           | Inhalt                                                                                                                                                                                                                                                                         |
|---:|-----------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|    | Titel                 |
|    | Name                  |
|    | Matrikelnummer        |
|  1 | Nutzerinteraktion     | Der Nutzer kann mit der Applikation interagieren. Mit welchen Mitteln und welchen Aktionen werden welche Reaktionen ausgelöst?    

Der Nutzer kann sich mit W, A, S und D auf der XZ-Plane fortbewegen. Ebenso kann er die Raumstation mit Q, E, LeftShift und LeftControl um sich rotieren.                                                                                                                                              |
|  2 | Objektinteraktion     | Mit Hilfe von Kollisionsprüfung interagieren Objekte miteinander. Wann passiert dabei wie was?                                                                                                                                                                                 |
|  3 | Objektanzahl variabel | Eine variable Anzahl von Objekten wird zur Laufzeit generiert. Welche sind dies und wann und wie geschieht die Erzeugung?                                                                                                                                                      |
|  4 | Szenenhierarchie      | Die Szenenhierarchie ist sinnvoll aufgebaut. Wer ist wessen Parent, wie sind Elemente in anderen gruppiert und warum?                                                                                                                                                          |
|  5 | Sound                 | Sounds sind eingebunden und unterstützen oder ermöglichen die Wahrnehmung der Aktionen. Welche Ereignisse werden durch Geräusche akustisch unterstützt, und durch welche Geräuschkulisse oder Musik die Atmosphäre?                                                            |
|  6 | GUI                   | Ein grafisches Interface gibt dem Nutzer die Möglichkeit, Einstellungen beim Programmstart oder während des Programmlaufs vorzunehmen. Was kann er dort tun?                                                                                   |
|  7 | Externe Daten         | Spielparameter sind extern in einer Datei veränderbar, so dass das Spiel nur neu gestartet, aber nicht neu kompiliert werden muss. Welche Parameter sind dies und was sind die Auswirkungen?                                                                                   |
|  8 | Verhaltensklassen     | Das Verhalten von Objekten ist in den Methoden von Klassen definiert, die in externen Dateien abgelegt sind. Welche Klassen sind dies und welches Verhalten wird dort beschrieben?                                                                                             |
|  9 | Subklassen            | Es existiert eine Klassenhierarchie, einige Objekte sind Instanzen von einer oder mehreren abgeleiteten Subklassen mit gegenüber den anderen Objekten speziellem Verhalten und besonderen Eigenschaften. Welche Klassen sind dies und welches Verhalten wird dort beschrieben? |
| 10 | Maße & Positionen     | Maße, Skala und Positionen sind gut durchdacht. Wie groß sind Spielfiguren, wie ist die Welt angeordnet bezogen auf den Ursprung, wie sind Spielelemente bezogen auf ihre lokalen Koordinatensysteme definiert?                                                                |
| 11 | Event-System          | Das Event-System wird verwendet. Wer sendet wem Informationen oder Methodenaufrufe und wofür?                                                                                                                                                                                  |



