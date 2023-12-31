## Фича с формой изменения профиля

- Constants

`ValidateProfileError` - ошибки валидирования профиля

- Components

`EditableProfileCard` - Карточка с редактируемой формой профиля

`EditableProfilePageHeader` - Заголовок с действиями по профилю пользователя

- Selectors

`getIsUserCanEditProfile` - Селектор для получения информации: может ли текущий пользователь редактировать профиль

`getProfileData` - Селектор для получения данных о профиле

`getProfileError` - Селектор для получения информации об ошибке при редактировании профиля

`getProfileForm` - Селектор для получения данных формы профиля

`getProfileIsLoading` - Селектор для получения информации о состоянии загрузки формы профиля

`getProfileReadOnly` - Селектор для получения информации: используется ли профиль только для чтения

`getProfileValidateErrors` - Селектор для получения информации об ошибках валидации профиля

- Services

`fetchProfileData` - Сервис для загрузки формы профиля

`updateProfileData` - Сервис для обновления профиля

`validateProfileData` - Сервис для валидации полей формы профиля

- Slices

`profileSlice` - Слайс для хранения информации о форме профиля

`cancelEdit` - Действие для отмены редактирования

`setReadOnly` - Действие для установки режима 'только для чтения'

`updateProfile` - Действие для обновления профиля

- Types

`ProfileSchema` - Тип, описывающий схему профиля в хранилище
