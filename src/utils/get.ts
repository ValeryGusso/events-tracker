import { Importance } from '@/store/modules/events/state';

export function getDate(date: Date) {
	const day = date.getDate();
	const month = date.getMonth() + 1;
	const year = date.getFullYear();
	const hour = date.getHours();
	const min = date.getMinutes();
	const sec = date.getSeconds();

	return `${day > 9 ? day : '0' + day}.${
		month > 9 ? month : '0' + month
	}.${year} ${hour}:${min > 9 ? min : '0' + min}:${sec > 9 ? sec : '0' + sec}`;
}

export function getImportance() {
	const num = Math.random();

	if (num > 0.93) return Importance.CRITICAL;
	if (num > 0.75) return Importance.HIGH;
	if (num > 0.5) return Importance.MEDIUM;
	return Importance.LOW;
}

export function getCorrectEventsForm(num: number) {
	const lastChar = num.toString().match(/\d$/);
	const beforeLastChar = num.toString().match(/(\d)\d$/);

	if (!lastChar) return 'событий';

	if (beforeLastChar && beforeLastChar[1] === '1') return 'событий';

	if (lastChar[0] === '1') return 'событие';
	if (lastChar[0] === '2' || lastChar[0] === '3' || lastChar[0] === '4') {
		return 'события';
	}
	return 'событий';
}
