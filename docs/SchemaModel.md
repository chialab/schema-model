## SchemaModel


#### new SchemaModel(data, options)



Generate Model classes based on JSON Schema definition.





**Parameters:**

| Name |Type | Description |
|---|---|---|
|`data` |*`Object`* |The (optional) initial data to set.|
|`options` |*`Object`* |Optional options for data setting.|























  

### Properties

| Name | Type | Description |
|---|---|---|
| `defaultOptions` | *`Object`* | Default model options. |
| `schema` | *`Object`* | The schema of the model. |


### Methods



#### *(static)* create(schema) *&rarr; {class}*



Create a new schema class extending SchemaModel.





**Parameters:**

| Name |Type | Description |
|---|---|---|
|`schema` |*`Object`* |The schema to use for the new model class.|








**Returns**:


**Type**: *`class`*
An extended SchemaModel.


















#### get(name) *&rarr; {any}*



Get a property value.





**Parameters:**

| Name |Type | Description |
|---|---|---|
|`name` |*`String`* |The property name to retrieve.|








**Returns**:


**Type**: *`any`*
The property value.


















#### set(data, options)



Set a bunch of properties.





**Parameters:**

| Name |Type | Description |
|---|---|---|
|`data` |*`Object`* |The data to set.|
|`options` |*`Object`* |Optional options for data setting.|


























#### validate(data) *&rarr; {Object}*



Validate a bunch of data or the model instance.





**Parameters:**

| Name |Type | Description |
|---|---|---|
|`data` |*`Object`* |Optional data to validate (if empty, use model's data).|








**Returns**:


**Type**: *`Object`*
A validation result.


















#### toJSON() *&rarr; {Object}*



Convert the model to a plain javascript object.











**Returns**:


**Type**: *`Object`*
A representation of the model as plain object.