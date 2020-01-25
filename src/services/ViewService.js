import preact from 'preact';
import Views from '../components/Views';
import GlobalsService from '../services/GlobalsService';
import BreadcrumbsService from '../services/BreadcrumbsService';
import Useful from '../helpers/Useful';

/**
 * Handles functionality for views
 */
class ViewService {
    constructor() {
        this.components = Views;
    }

    /**
     * Runs callback when the view has been added to the page
     * @param  {obj}  settings The view settings
     * @param  {bool} backed   Whether this call was run from backing a view
     * @return void
     */
    run(settings, backed = false) {
        const views = document.querySelectorAll('#app .views > .view');
        const view = document.getElementById(settings.id);
        const activeClass = 'is-active';
        const viewState = GlobalsService.get('viewState');
        let breadcrumbs = BreadcrumbsService.get();
        let firstLoad = false;

        // Check if we're loading this view for the first time and add default
        // state to globals

        if ('title' in settings) {
            firstLoad = true;
            GlobalsService.updateViewState(settings);
        }

        // Add to breadcrumbs

        breadcrumbs = BreadcrumbsService.add(settings.id);

        [...new Set(breadcrumbs)].forEach((item, i) => {
            const viewEl = document.getElementById(item);
            const viewZIndex = breadcrumbs.length - i;

            if (viewEl) {
                viewEl.style.zIndex = (viewZIndex + 5);
            }
        });

        // Check if backable so we can swipe back

        if (viewState[settings.id].backable && !backed) {
            const animateClass = 'animate-fade-in-right';

            // Animate the view in

            view.classList.add(animateClass);
            setTimeout(() => {
                view.classList.remove(animateClass);
            }, 500);

            // Bind touch events to swipe back

            if (firstLoad) {
                this.backEvents(settings.id, view);
            }
        }

        // Check if slidable so we can swipe down

        if (viewState[settings.id].slidable && !backed) {
            const animateClass = 'animate-fade-in-bottom';

            // Animate the view in

            view.classList.add(animateClass);
            setTimeout(() => {
                view.classList.remove(animateClass);
            }, 500);

            // Bind touch events to swipe back

            if (firstLoad) {
                this.slideEvents(settings.id, view);
            }
        }

        // Remove the active class from all views

        let activeTimeout = 0;

        if (typeof device !== 'undefined') {
            if (device.platform == 'iOS') {
                activeTimeout = 500;
            }
        }

        setTimeout(() => {
            [].slice.call(views).forEach((item) => {
                item.classList.remove(activeClass);
            });

            // Add active class to current view

            if (!view.classList.contains(activeClass)) {
                view.classList.add(activeClass);
            }
        }, activeTimeout);
    }

    /**
     * Move the view back to reveal the previous one
     * @param  {str} id   The view ID
     * @param  {str} type The type of action
     * @return void
     */
    goBack(id = '', type = 'back') {
        const currentView = document.querySelector('.view.back.is-active') || document.querySelector('.view.slid.is-active');
        let backedClass = `has-${type}`;
        let viewId = id;

        if (viewId == '' && currentView) {
            viewId = currentView.getAttribute('id');
            if (currentView.classList.contains('back')) {
                backedClass = 'has-back';
            } else if (currentView.classList.contains('slid')) {
                backedClass = 'has-slid';
            }
        }

        const view = document.getElementById(viewId);

        if (!view && typeof device !== 'undefined' && device.platform == 'Android' && id == '') {
            navigator.app.exitApp();
            window.close();
        } else {
            Useful.setTransform(view, '');
            view.classList.add(backedClass);

            BreadcrumbsService.removeFirst();

            setTimeout(() => {
                this.run({ id: BreadcrumbsService.get()[0] }, true);
                this.removeView(viewId);
            }, 100);
        }
    }

    /**
     * Bind touch events to the view to swipe back
     * @param  {str} id The view ID
     * @return void
     */
    backEvents(id) {
        const view = document.getElementById(id);
        let gesture = {};

        // Enable swipe view right

        view.addEventListener('touchstart', (e) => {
            const x = e.touches[0].clientX;

            gesture = {
                touching: true,
                backed: false,
                x: 0
            };

            gesture.x = x;
        });

        // Track the gesture and move the view with the gesture

        view.addEventListener('touchmove', (e) => {
            const x = parseInt(e.touches[0].clientX, 10);

            if (gesture.touching && (x - gesture.x) > 0 && gesture.x < 40) {
                if ((x - gesture.x) > 100 && !gesture.backed) {
                    gesture.backed = true;
                    e.preventDefault();
                    this.goBack(id);
                } else if (x > 0 && !gesture.backed) {
                    Useful.setTransform(view, `translateX(${x - gesture.x}px)`);
                } else if (x < 0 && !gesture.backed) {
                    Useful.setTransform(view, 'translateX(0)');
                }
            }
        });

        // If the gesture ends then go back to the default position

        view.addEventListener('touchend', () => {
            gesture.touching = false;

            if (!gesture.backed) {
                Useful.setTransform(view, 'translateX(0)');
            }
        });
    }

    /**
     * Bind touch events to the view to swipe down
     * @param  {str} id The view ID
     * @return void
     */
    slideEvents(id) {
        const view = document.getElementById(id);
        const container = view.querySelector('.view__container');
        let scrolled = false;
        let gesture = {};

        // Enable swipe view right

        view.addEventListener('touchstart', (e) => {
            const y = e.touches[0].clientY;

            gesture = {
                touching: true,
                backed: false,
                y: 0
            };

            gesture.y = y;
        });

        // Track the gesture and move the view with the gesture

        view.addEventListener('touchmove', (e) => {
            const y = parseInt(e.touches[0].clientY, 10);

            // Check if user has scrolled down and then is going to the top

            if (container.scrollTop > 1) {
                scrolled = true;
            }

            // Swipe down if at the top

            if (container.scrollTop < 2 && !scrolled) {
                if (gesture.touching && (y - gesture.y) > 0) {
                    if ((y - gesture.y) > 100 && !gesture.backed) {
                        gesture.backed = true;
                        e.preventDefault();
                        this.goBack(id, 'slid');
                    } else if (y > 0 && !gesture.backed) {
                        Useful.setTransform(view, `translateY(${y - gesture.y}px)`);
                    } else if (y < 0 && !gesture.backed) {
                        Useful.setTransform(view, 'translateY(0)');
                    }
                }
            }
        });

        // If the gesture ends then go back to the default position

        view.addEventListener('touchend', () => {
            gesture.touching = false;

            if (!gesture.backed) {
                Useful.setTransform(view, 'translateY(0)');
            }

            // Check if user has scrolled down and then is going to the top

            if (container && container.scrollTop < 2) {
                scrolled = false;
            }
        });
    }

    /**
     * Displays the view to the page
     * @param  {str}  view    The view to display
     * @param  {obj}  params  Any extra params to pass to view
     * @param  {bool} refresh Whether to reinitialize the view or not
     * @return void
     */
    open(view, params = {}, refresh = false) {
        const viewId = view.toLowerCase();
        const viewAdded = document.getElementById(viewId);
        const View = this.components[view];
        const views = GlobalsService.get('views');
        let addView = true;
        let instance = {};

        // Add view to the page depending on refresh logic and if the view is
        // already there or not

        GlobalsService.set('currentView', viewId);

        if (refresh && viewAdded) {
            viewAdded.remove();
        } else if (viewAdded) {
            this.run({ id: viewId });
            addView = false;
        }

        const ref = (c) => {
            instance = c;
        };

        if (addView) {
            preact.render(<View ref={ref} params={params} />, document.querySelector('#app .views'));
            views[viewId] = instance;
            GlobalsService.set('views', views);
        } else if ('activeCallback' in views[viewId]) {
            views[viewId].activeCallback();
        }
    }

    /**
     * Close the view
     * @param  {integer} id The view ID
     * @return void
     */
    close(id) {
        const view = document.getElementById(id);

        if (view) {
            if (view.classList.contains('back')) {
                this.goBack(id);
            } else if (view.classList.contains('slid')) {
                this.goBack(id, 'slid');
            } else {
                this.removeView(id);
            }
        }
    }

    /**
     * Removes view from the DOM
     * @param  {string} id The view ID
     * @return void
     */
    removeView(id) {
        const view = document.getElementById(id);
        const views = GlobalsService.get('views');

        if (typeof views[id] !== 'undefined' && 'unload' in views[id]) {
            views[id].unload();
        }

        delete views[id];
        view.remove();
    }
}

export default new ViewService();
