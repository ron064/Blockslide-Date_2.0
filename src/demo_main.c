#include <pebble.h>
#include "pposdemo.h"

typedef struct {
	void (*load)();
	void (*unload)();
	void (*redraw)();
	void (*info)(void* disp_info);
} app_t;

int8_t AllSet[SETSIZE];
display_info disp_info;
app_t current_app;
int resourceOffset = 0;

GColor backColor = GColorBlack;						
GColor foreColor = GColorWhite;
Layer *rootLayer;
static Window *window;

#define ENTRYPOINTS(NAME) void redraw_ ## NAME (); void load_ ## NAME (); \
                          void unload_ ## NAME (); void info_ ## NAME (void* disp_info);

	ENTRYPOINTS(block)

#define ENTRYPOINTROW(NAME) { .load = load_ ## NAME,     .unload = unload_ ## NAME, \
                              .redraw = redraw_ ## NAME, .info = info_ ## NAME }

static app_t appConfig[] = {
	ENTRYPOINTROW(block)
};

void window_load(Window *window) {
	current_app.load();	
}

// Deinitialize resources on window unload that were initialized on window load
void window_unload(Window *window) {
	current_app.unload();
	layer_remove_child_layers(rootLayer);
	if (window != NULL)
	{
		//window_destroy(window);
		//window=NULL;		
	}
}
void handle_init()
{
  current_app=appConfig[0];
  current_app.info(&disp_info);

  if (disp_info.def_cnt>0)
  for (int8_t i=0; i<disp_info.def_cnt;i++)
    AllSet[disp_info.def_set[i][0]]= disp_info.def_set[i][1];
    //AllSet[i]= disp_info.def_set[i][1];
	
  window = window_create();
  window_set_background_color(window, GColorBlack);
  rootLayer = window_get_root_layer(window);

  // Setup the window handlers
  window_set_window_handlers(window, (WindowHandlers) {
    .load = window_load,
    .unload = window_unload,
  });
	
  window_stack_push(window, true);
}
void handle_deinit()
{
	if (window != NULL)
		window_destroy(window);
}

int main(void) {
  handle_init();
  app_event_loop();
  handle_deinit();
}