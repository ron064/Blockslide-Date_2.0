# modified BlockSlide #
#### Example of adjusting a project to Pebble PoS demo infrastructure ####
#### by Ron64 ####
This branch of BlockSlide(By Jnm) was created to demonstrate how to convert source code, in order to submit it to the Pebble POS overlay demo project (By Ron64 & Gregoire Sage)
If your project have resources or uses GPath with drawing routine, there are additional steps (we will update the PebbleOne example for it.)

##Main steps##

* Add pposdemo.h (add SET_xxx for your settings)
* modify your code (entry points, colors, settings, disable messages, etc)
* Test it with demo_main.c

## Detailed Steps ##
### Preparation ###
Test your watch-face for leaks. Use pebble logs and make sure you see Still allocated <0B> when you exit the app.

### Setting preperation ###

* In your code add #include "pposdemo.h"
* For settings, define yours in the enum at pposdemo.h (for example rename SET_032 to SET_MYDEF). Use this enum for your settings with AllSet[SET_MYDEF], and set it's values in the HTML file.

### Watch face modification steps ###

* Add #include "pposdemo.h"
* Remove references to Window in init() and deinit(). Let the main program create and destroy the main window, use rootLayer to add your layers.
* Provide entrypoints for creating (load_xxx), destroying (unload_xxx),  and redrawing (redraw_xxx) the window content. the last line of load_xxx should call configRedraw();
* Make all the remaining global variables and functions in your app static - to prevent identical named globals from other apps from clashing.
* Change all GColorBlack to backColor and GColorWhite to foreColor
* Change any string array from form of "const char* days[]" to "const char days[][12]" (Two bytes bigger than length of your longest string, more for unicode.) Otherwise compiler makes some pointer table to string start that won't relocate with the code and cause crash.
* Disable all existing settings code that work with msg inbox, tuple, persistent memory, etc. Instead, get setting from the array AllSet[SET_MYDEF]. Code for updating according to settings changes is not needed, as the entire watchface can be reloaded.
* For settings use general settings like date format and language read existing settings like AllSet[SET_DATE], AllSet[SET_LANG]. for your settings use AllSet[setOffset], AllSet[setOffset+1]...
* If you used float and it's not totally necessary, please convert it to integer.
* If you have many static data it is recomanded to convert some of them to dynamic loading (see digitCorners) or load from resources (see digits), moving these two from static data to dynamic loading I changed this from largest part, to one of the smaller. (size of area allocated for all overlaid pieces is determined by largest piece)
* If you use GPath, move your GPath data and setup function to external file with setup function(check other examples such as hop_picker & PebbleOne). Otherwise the GPath draw function will crash.

### Adding Info and settings default ###
Every display should include this data to give proper credit, and preferred default settings

* Add info_xxx like the example.
* app_name and dev_name are used to give correct credits to the developer.
* Def_set lists the values for each setting parameter. the index in AllSet, a default value, and an optional value if needed. this can allow to display the watch-face as developer intended, and in an optional configuration as well.
* def_cnt mark how many setting exist in def_set array. if def_opt is zero, the additional optional setting will be ignored.

### Using demo_main for testing ###

* Add your app short name xxx into ENTRYPOINTS(xxx) and ENTRYPOINTROW(xxx), in demomain.c (In here xxx=block)
* let it run your modified code to make sure it works, and that it is displayed correctly.
