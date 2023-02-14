# EDI Generator

## Description:

This Suitelet receives a request object and generates EDI formatted text from the indicated EDI template 
and fields mapped via the user interface in the customrecord_hck_edi_map record.

## Usage:

### Mapping:

Field mapping is done in the customrecord_hck_edi_map record.

#### Customer Name
![Customer Name]("https://github.com/felipechang/netsuite-edi-generator/blob/main/images/customerName.png?raw=true")

#### Order Date
![Order Date]("https://github.com/felipechang/netsuite-edi-generator/blob/main/images/orderDate.png?raw=true")

#### Line Counter
![Line Counter]("https://github.com/felipechang/netsuite-edi-generator/blob/main/images/counter.png?raw=true")

#### Line Item
![Line Item]("https://github.com/felipechang/netsuite-edi-generator/blob/main/images/itemme.png?raw=true")

#### Line Quantity
![Line Quantity]("https://github.com/felipechang/netsuite-edi-generator/blob/main/images/quantity.png?raw=true")

#### Line Price
![Line Price]("https://github.com/felipechang/netsuite-edi-generator/blob/main/images/price.png?raw=true")

#### Total Amount
![Total Amount]("https://github.com/felipechang/netsuite-edi-generator/blob/main/images/totalAmount.png?raw=true")


### EDI template:

Template fields are wrapped in single dollar signs `$`.

```text
10000$customerName$$orderDate$00000000000000000000000000000
2$counter$$item$000000$quantity$$price$00000000000000000000
3$totalAmount$000000000000000000000000000000000000000000000
```

### SuiteScript:

We call the Suitelet via POST request with the following parameters:

#### Input Parameters:

- template (String): NetSuite file ID of the EDI template.
- group (String): EDI group ID in the customrecord_hck_edi_map record.
- values (Object): An object with values to be replaced on the template body.
- lines (Array): An array of objects with values to be replaced on the template lines.
- separator (String|Optional): EDI template line separator, defaults to `\r`.

Note that `lines` fields take precedence over `values` fields, so for example, orderDate could be also printed on each line.

```typescript
import {resolveScript} from "N/url";
import {post} from "N/https";
import {audit, error} from "N/log";

const response = post({
    url: resolveScript({
        scriptId: "customscript_hck_edi_map",
        deploymentId: "customdeploy_hck_edi_map",
        returnExternalUrl: true,
    }),
    body: JSON.stringify({
        "template": "1234",
        "group": "1",
        "separator": "\r",
        "values": {
            "customerName": "John Doe",
            "orderDate": "2023/02/14",
            "totalAmount": "100.00"
        },
        "lines": [
            {"counter": 1, "item": "12345", "quantity": 1, "price": "10.00"},
            {"counter": 2, "item": "67890", "quantity": 1, "price": "90.00"}
        ]
    })
});
const out = JSON.parse(response.body);
if (out.error) error({title: "Error", details: out.error});

audit({title: "Response", details: out.output});

// Returns {error: 'Error message', output: 'EDI formatted text
```

### Output:

Outputted text is formatted according to the customrecord_hck_edi_map specifications.

```text
10000John Doe 140022023##00000000000000000000000000000
2000000001 123450000000000000001000100000000000000000000000
2000000002 678900000000000000001000900000000000000000000000
30000000010000000000000000000000000000000000000000000000000
```

## Author

Felipe Chang <felipechang@hardcake.org>