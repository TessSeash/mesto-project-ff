const config = {

	baseUrl: 'https://nomoreparties.co/v1/wff-cohort-31',

	headers: {
		authorization: '4d972093-8638-4473-b725-1529b878a757',
		'Content-Type': 'application/json'
	}

}

const getResponse = res => {

	if (res.ok) {
		return res.json()
	}
	return Promise.reject(`Ошибка ${res.status}`)

}

const getInitialsCardsApi = () => {

	return fetch(`${config.baseUrl}/cards`, {
		headers: config.headers,
	}).then(getResponse)

}

const getUserDataApi = () => {

	return fetch(`${config.baseUrl}/users/me`, {
		headers: config.headers,
	}).then(getResponse)

}

const addNewCardApi = (name, link) => {

	return fetch(`${config.baseUrl}/cards`, {
		method: 'POST',
		headers: config.headers,
		body: JSON.stringify({
			name,
			link,
		}),
	}).then(getResponse)

}

const editUserDataApi = (name, about) => {
	return fetch(`${config.baseUrl}/users/me`, {
		method: 'PATCH',
		headers: config.headers,
		body: JSON.stringify({
			name,
			about,
		}),
	}).then(getResponse)
}

const deleteOwnerCard = (cardId) => {
	return fetch(`${config.baseUrl}/cards/${cardId}`, {
		method: 'DELETE',
		headers: config.headers,
	}).then(getResponse)
}

const setLikeApi = (cardId, isLiked) => {
	const method = isLiked ? 'DELETE' : 'PUT'

	return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
		method,
		headers: config.headers,
	}).then(getResponse)
}

const updateAvatarApi = avatar => {
	return fetch(`${config.baseUrl}/users/me/avatar`, {
		method: 'PATCH',
		headers: config.headers,
		body: JSON.stringify({
			avatar,
		}),
	}).then(getResponse)
}


export { getInitialsCardsApi, getUserDataApi, addNewCardApi, editUserDataApi, deleteOwnerCard, setLikeApi, updateAvatarApi }