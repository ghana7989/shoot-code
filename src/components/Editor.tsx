import React, { useEffect, useRef } from 'react';
import Codemirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';
import { ACTIONS } from '../Actions';
interface IEditor {
	socketRef: any;
	roomId: string;
	onCodeChange: (code: string) => void;
}
const Editor = ({ socketRef, roomId, onCodeChange }: IEditor) => {
	const editorRef: any = useRef(null);
	useEffect(() => {
		async function init() {
			editorRef.current = Codemirror.fromTextArea(
				document.getElementById('realtimeEditor') as any,
				{
					mode: { name: 'javascript', json: true },
					theme: 'dracula',
					autoCloseTags: true,
					autoCloseBrackets: true,
					lineNumbers: true,
				}
			);

			editorRef.current.on(
				'change',
				(instance: { getValue: () => any }, changes: { origin: any }) => {
					const { origin } = changes;
					const code = instance.getValue();
					onCodeChange(code);
					if (origin !== 'setValue') {
						socketRef.current.emit(ACTIONS.CODE_CHANGE, {
							roomId,
							code,
						});
					}
				}
			);
		}
		init();
	}, []);

	useEffect(() => {
		if (socketRef.current && editorRef.current) {
			socketRef.current.on(
				ACTIONS.CODE_CHANGE,
				({ code }: { code: string }) => {
					if (code !== null) {
						editorRef.current.setValue(code);
					}
				}
			);
		}

		return () => {
			socketRef.current.off(ACTIONS.CODE_CHANGE);
		};
	}, [socketRef.current]);

	return <textarea id='realtimeEditor'></textarea>;
};

export default Editor;
