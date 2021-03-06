<?php

/*
|--------------------------------------------------------------------------
| CP routes
|--------------------------------------------------------------------------
*/

Route::namespace('\Jonassiewertsen\Butik\Http\Controllers\CP')
    ->prefix('butik/')
    ->name('butik.')
    ->group(function () {
        Route::get('variants/from/{product}', 'VariantsController@from')
        ->name('variants.from-product');

        Route::resource('variants', 'VariantsController')->only([
            'store', 'update', 'destroy',
        ]);

        Route::get('variants/{product}', 'VariantsController@from')
        ->name('variants.index');

        Route::resource('orders', 'OrdersController')->only([
            'index', 'show',
        ]);

        Route::resource('settings', 'SettingsController')->only([
            'index',
        ]);

        Route::prefix('settings')->group(function () {
            Route::resource('taxes', 'TaxesController')->only([
                'index', 'create', 'store', 'edit', 'update', 'destroy',
            ]);

            Route::resource('shipping', 'ShippingController')->only([
                'index',
            ]);

            Route::resource('shipping-profiles', 'ShippingProfilesController')->only([
                'index', 'show', 'store', 'update', 'destroy',
            ]);

            Route::resource('shipping-zones', 'ShippingZonesController')->only([
                'store', 'update', 'destroy',
            ]);

            Route::resource('shipping-rates', 'ShippingRatesController')->only([
                'store', 'update', 'destroy',
            ]);
        });

        // Actions for individual listings as used by fx orders.
        Route::name('actions.')->prefix('actions')->group(function () {
            Route::post('orders', 'OrderActionController@run')->name('orders.run');
            Route::get('orders', 'OrderActionController@bulkActions')->name('orders.bulk');
        });

        // API Resource Controller
        Route::prefix('api')->name('api.')->group(function () {
            Route::get('orders/get', 'Api\OrdersController@index')->name('orders.index');
        });
    });
