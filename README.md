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



| Nr | Bezeichnung           | Inhalt                                                                                                                                                                                                                                                                         |
|---:|-----------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|    | Titel                 | Discombobulated Space Station – 3D FUDGE Game
|    | Name                  | Calvin Dell'Oro
|    | Matrikelnummer        | 263179
|  1 | Nutzerinteraktion     | Der Nutzer kann mit der Applikation interagieren. Mit welchen Mitteln und welchen Aktionen werden welche Reaktionen ausgelöst?------------> Der Nutzer kann den Charackter mit W, A, S und D auf der XZ-Ebene fortbewegen. Ebenso kann er die Raumstation mit Q, E, LeftShift und LeftControl um sich rotieren, sowie mit F Dinkelbeeren legen.                                                                                                                                                 |
|  2 | Objektinteraktion     | Mit Hilfe von Kollisionsprüfung interagieren Objekte miteinander. Wann passiert dabei wie was?----------> Auf jedem Labyrinth-Element, welches eine Instanz der Klasse "Element" - oder Subklassen davon - ist, wird eine selbstprogrammierte Box-Collision durchgeführt, da alle meiner Labyrinth-Elemente perfekte Würfel sind, und sich niemals in Schrägstellung, sondern immer in um 90°-gedrehten Zuständen befinden. Anhand dieser Prämisse lässt sich eine Kollisionsprüfung sehr einfach auf Basis von Berechnungen der Eckpunkte, welche durch die Einheitseins als Definition der Kantenlänge eines jeden Labyrinth-Würfels eine halbe Einheit von der Mitte der jeweiligen Labyrinth-Elemente entfernt sind, durchführen, ohne die zusätzlichen Performanceauslastungen durch in Fudge integrierte Collider zu provozieren.                                                                                                                                                                         |
|  3 | Objektanzahl variabel | Eine variable Anzahl von Objekten wird zur Laufzeit generiert. Welche sind dies und wann und wie geschieht die Erzeugung?-------------> Durch das Drücken der F-Taste werden zur Laufzeit eine variable Anzahl physikalisch berechneter Dinkelbeeren generiert.                                                                                                                                                      |
|  4 | Szenenhierarchie      | Die Szenenhierarchie ist sinnvoll aufgebaut. Wer ist wessen Parent, wie sind Elemente in anderen gruppiert und warum?-------------> Die aus der .dae File importierten und instantiierten Labyrinth-Elemente werden einer Node "createdElements" untergeordnet, um sie bei Zugriff, beispielsweise für die Labyrinth-Rotation, leichter durchiterieren zu können. Jedem einzelnen Element wiederrum sind seine Wände untergeordnet.                                                                                                                                                           |
|  5 | Sound                 | Sounds sind eingebunden und unterstützen oder ermöglichen die Wahrnehmung der Aktionen. Welche Ereignisse werden durch Geräusche akustisch unterstützt, und durch welche Geräuschkulisse oder Musik die Atmosphäre?------------> Die Labyrinth-Rotation wird durch einen quietschenden Sound unterstützt, sowie die Atmosphäre durch Space-Station Hintergrundsounds.                                                             |
|  6 | GUI                   | Ein grafisches Interface gibt dem Nutzer die Möglichkeit, Einstellungen beim Programmstart oder während des Programmlaufs vorzunehmen. Was kann er dort tun?------------> Während des Programmlaufs kann der Nutzer durch einen HTML-Toggle den Hardcore-Modus aktivieren.                                                                                   |
|  7 | Externe Daten         | Spielparameter sind extern in einer Datei veränderbar, so dass das Spiel nur neu gestartet, aber nicht neu kompiliert werden muss. Welche Parameter sind dies und was sind die Auswirkungen?------------> In der File "elements.dae" können die zu importierenden Labyrinth-Elemente beliebig in ihrer Translation & Rotation, sowie ihrem Typen verändert werden.                                                                                    |
|  8 | Verhaltensklassen     | Das Verhalten von Objekten ist in den Methoden von Klassen definiert, die in externen Dateien abgelegt sind. Welche Klassen sind dies und welches Verhalten wird dort beschrieben?------------> Die Klasse "Element" beschreibt das Verhalten der Labyrinth-Elemente, welches aus Kollisionsprüfungen und Aufbaufunktionen besteht.                                                                                             |
|  9 | Subklassen            | Es existiert eine Klassenhierarchie, einige Objekte sind Instanzen von einer oder mehreren abgeleiteten Subklassen mit gegenüber den anderen Objekten speziellem Verhalten und besonderen Eigenschaften. Welche Klassen sind dies und welches Verhalten wird dort beschrieben?-----------> Die Klasse "Goal" ist als Subklasse von "Element" eine Spezifikation dieser und beinhaltet das Ändern der Goldene-Kabine-Textur, sowie die Daten dafür. Die Klasse "Element" ist selbst eine Subklasse von ƒ.Node. |
| 10 | Maße & Positionen     | Maße, Skala und Positionen sind gut durchdacht. Wie groß sind Spielfiguren, wie ist die Welt angeordnet bezogen auf den Ursprung, wie sind Spielelemente bezogen auf ihre lokalen Koordinatensysteme definiert?-------------> Die Einheitseins ist als die Seitenlänge der Element-Würfel definiert, da sich alle Labyrinth-Elemente diese Eigenschaft teilen, und somit die Kollisionsprüfung und Abschätzen der Spielgröße sowie Positionen für einen Entwickler intuitiver gestaltet. Der Charakter als Spielfigur hat die Höhe 0.35, da sich dies bei Tests als angenehm herausgestellt hat.                                                                 |
| 11 | Event-System          | Das Event-System wird verwendet. Wer sendet wem Informationen oder Methodenaufrufe und wofür?------------> Der init-Methode in der Klasse "Main" wird ein Eventlisteners auf dem "load"-Event des Windows hinzugefügt. Der Canvas sendet über das "mousedown"-MouseEvent sich selbst einen Methodenaufruf für eine Anfrage der Sperrung des Mouse-Cursors, sowie über das "mouseup"-Event einen Methodenaufruf für das Beenden der Maus-Cursor-Sperrung, unter der Voraussetzung, dass der Button dieses MouseEvents der mittlere Mousebutton ist. Für die Charakterrotation wird meine "onMouseMove"-Methode in der Main-Klasse durch das "mousemove"-MouseEvent auf dem Window aufgerufen.  

