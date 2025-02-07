import TaxesListing from './components/taxes/Listing';
import OrdersListing from './components/orders/Listing';

import ShippingOverview from "./components/shipping/Overview";

import ProductVariants from "./components/variants/ManageProductVariants";

import CategoriesFieldtype from './fieldtypes/categoriesFieldtype';
import CountriesFieldtype from './fieldtypes/countriesFieldtype';
import MoneyFieldtype from './fieldtypes/moneyFieldtype';
import NumberFieldtype from './fieldtypes/numberFieldtype';
import ShippingFieldtype from './fieldtypes/shippingFieldtype';
import TaxFieldtype from './fieldtypes/taxFieldtype';
import VariantsFieldtype from './fieldtypes/variantsFieldtype';

import CreateButton from './partials/CreateButton';
import PublishFormRedirect from './partials/PublishFormRedirect';
import TrackAndTrace from './partials/TrackAndTrace';
import Notes from './components/orders/Notes';

Statamic.booting(() => {
    // Control Panel
    Statamic.$components.register('butik-tax-list', TaxesListing);
    Statamic.$components.register('butik-order-list', OrdersListing);
    Statamic.$components.register('butik-shipping-overview', ShippingOverview);
    Statamic.$components.register('butik-manage-product-variants', ProductVariants);

    // Fieldtypes
    Statamic.$components.register('categories-fieldtype', CategoriesFieldtype);
    Statamic.$components.register('countries-fieldtype', CountriesFieldtype);
    Statamic.$components.register('money-fieldtype', MoneyFieldtype);
    Statamic.$components.register('number-fieldtype', NumberFieldtype);
    Statamic.$components.register('shipping-fieldtype', ShippingFieldtype);
    Statamic.$components.register('tax-fieldtype', TaxFieldtype);
    Statamic.$components.register('variants-fieldtype', VariantsFieldtype);

    // Partials
    Statamic.$components.register('create-button', CreateButton);
    Statamic.$components.register('publish-form-redirect', PublishFormRedirect);
    Statamic.$components.register('track-and-trace', TrackAndTrace);
    Statamic.$components.register('notes', Notes);
});
