import { useState, useMemo } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Modal, Button, Input, Alert } from 'antd';
const { TextArea } = Input;

export default function CopyPaste({ chars, setChars }) {
    const [showPaste, setShowPaste] = useState(false);
    const [config, setConfig] = useState('');
    const [error, setError] = useState();

    function onOk() {
        try {
            setChars(JSON.parse(config));
            setShowPaste(false);
        } catch (error) {
            setError(error);
            console.log(error);
        }
    }

    return (
        <>
            <Modal
                title="Paste Config"
                visible={showPaste}
                onOk={onOk}
                onCancel={() => setShowPaste(false)}
            >
                {error ? <Alert message="Unable to parse config" type="error" /> : null}
                <TextArea
                    rows={15}
                    value={config}
                    onChange={e => {
                        setConfig(e.target.value);
                        setError(undefined);
                    }}
                />
            </Modal>
            <CopyToClipboard text={useMemo(() => JSON.stringify(chars), [chars])}>
                <Button>Copy</Button>
            </CopyToClipboard>
            <Button onClick={() => setShowPaste(true)}>Paste</Button>
        </>
    );
}
