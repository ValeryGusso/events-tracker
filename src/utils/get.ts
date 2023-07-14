import { Importance } from '@/store/modules/events/state';

export function getImportanceColor(importance: Importance) {
	switch (importance) {
		case Importance.LOW:
			return '#10b981';
		case Importance.MEDIUM:
			return '#22d3ee';
		case Importance.HIGH:
			return '#eab308';
		case Importance.CRITICAL:
			return '#f43f5e';
	}
}

export function getDate(date: Date) {
	const day = date.getDay();
	const month = date.getMonth() + 1;
	const year = date.getFullYear();
	const hour = date.getHours();
	const min = date.getMinutes();
	const sec = date.getSeconds();

	return `${day > 9 ? day : '0' + day} ${
		month > 9 ? month : '0' + month
	} ${year} ${hour}:${min > 9 ? min : '0' + min}:${sec > 9 ? sec : '0' + sec}`;
}
