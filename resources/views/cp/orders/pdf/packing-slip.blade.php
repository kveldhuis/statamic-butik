<html>

<head>
    <style>
        header {
            width: 4in;
            display: block;
            margin-left: auto;
            margin-right: auto;
            height: 1in;
        }

        body {
            margin: 0in 0in 0in 0in;
            width: 8.5in;
            height: 11in;
        }

        * {
            font-family: arial;
            font-size: 12px;
        }

        th {
            background-color: gray;
            color: white;
            font-weight: bold;
        }

        td {
            vertical-align: top;
        }

        .store-info div {
            font-size: 1.2em;
        }

        .store-info div.company-name {
            font-size: 1.5em;
            font-weight: bold;
        }

        table.order-info td {

            padding: 2px 4px 2px 4px;
        }

        table.order-info tr td.label {
            font-weight: bold;
            text-align: right;
            border-right: solid 1px #c0c0c0;

        }

        table.order-info tr td.label.first {}

        table.order-info tr td.label.last {}

        table.line-items {
            margin-top: 0.1in;
            padding: 0.1in 0in 0.1in 0in;
        }

        table.line-items th {
            padding: 2px;
        }

        table.footer {
            border-top: solid 1px #707070;
        }

        table.footer td.label {
            font-weight: bold;
            text-align: right;
        }

        td.notes {
            padding: 0.1in;
            font-style: italic;
        }

        .barcode {
            font-family: "Free 3 of 9 Extended";
            font-size: 48pt;
        }
    </style>
</head>

<body>
<!-- Order Header - THIS SECTION CAN BE MODIFIED AS NEEDED -->
<header>
    <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/2907890/Incycle_Logo_flat.svg"><br>
</header>
<table cellspacing=0 cellpadding="2" border=0 style="width:8.5in">
    <thead>
    <tr>
        <th colspan="3">
            Packing Slip
        </th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td colspan="2" style="width:4.5in" class="store-info">
            <div class="company-name">Incycle Bicycles</div>
            <div>133 S Eucla Ave.<br/>San Dimas, CA 91773</div>
        </td>
        <td style="width:3.5in;" align="right" valign="top">

        </td>
    </tr>
    <tr>
        <td style="height:0.15in"></td>
    </tr>
    <tr>
        <td align="right" style="width:1in">
            <b>Ship To:</b>
        </td>
        <td style="width:3.5in; font-size:14px">
            <div>[Recipient Name]</div>
            <div>[Recipient Address]</div>
        </td>
        <td style="width:2.5in">
            <table cellspacing="0" border="0" class="order-info">
                <tr>
                    <td align="right" class="label first">Order #</td>
                    <td>[Order #]</td>
                </tr>
                <tr>
                    <td align="right" class="label">Date</td>
                    <td>[Order Date]</td>
                </tr>
                <tr>
                    <td align="right" class="label last">Ship Date</td>
                    <td>[Ship Date]</td>
                </tr>
            </table>
        </td>
    </tr>
    </tbody>
</table>

<!-- END Order Header -->

<table cellspacing=0 cellpadding="2" border="0" style="width:100%" class="line-items">
    <thead>

    <!-- Order Items Header - THIS SECTION CAN BE MODIFIED AS NEEDED -->

    <tr>
        <th align="left" style="width:1.5in" class="sku">
            Item
        </th>
        <th align="left" style="width:1.5in" class="sku">
            Item SKU
        </th>
        <th align="left">
            Item Details
        </th>
        <th align="right" style="width:0.75in" class="price">
            Price
        </th>
        <th align="center" style="width:0.75in">
            Qty
        </th>
        <th align="right" style="width:0.75in" class="price">
            Ext. Price
        </th>
    </tr>

    <!-- END Order Items Header -->

    </thead>
    <tbody>

    <!-- Order Items - THIS SECTION CAN BE MODIFIED AS NEEDED -->
    <tr>
        <td class="sku">[Item Title]</td>
        <td class="sku">[Sku]</td>
        <td>[Item Options]</td>
        <td align="right" class="price">[Unit Price]</td>
        <td align="center">[Quantity]</td>
        <td align="right" class="price">[Extended Price]</td>
    </tr>
    <!-- END Order Items -->

    </tbody>
</table>

<!-- Order Footer - THIS SECTION CAN BE MODIFIED AS NEEDED -->

<table cellspacing=0 cellpadding="2" border="0" style="width:100%" class="footer">
    <p>
        [Notes to Buyer]
    </p>
    <tbody>
    <tr>
        <td align="right" class="label price">
            Sub Total:
        </td>
        <td style="width:0.75in" align="right" class="price">[Items Total]</td>
    </tr>
    <tr>
    <tr class="tax">
        <td align="right" class="label price">
            Tax:
        </td>
        <td style="width:0.75in" align="right" class="price">[Tax Paid]</td>
    </tr>
    <tr>
        <td align="right" class="label price">
            Shipping:
        </td>
        <td style="width:0.75in" align="right" class="price">[Shipping Paid]</td>
    </tr>
    <tr>
        <td align="right" class="label price">
            Total:
        </td>
        <td style="width:0.75in" align="right" class="price">[Order Total]</td>
    </tr>
    </tbody>
</table>

<!-- END Order Footer -->

</div>

</body>

</html>
