import { useSelector } from "react-redux";
import { RootState } from "../../stores/store";
import { getScripts } from "../../utils/voiceModelAPI";
import { useState, useEffect } from "react";

interface Script {
  no: number,
  script: string
}

function RecordingPage() {
  const recordCount = useSelector((state: RootState) => state.voiceModel.recordCount);

  const [scripts, setScripts] = useState<Script[]>([]);

  const getScriptData = async () => {
    const scripts = await getScripts();
    setScripts(scripts);
  };

  useEffect(() => {
    getScriptData();
  }, [])

  return (
    <div>
      <p>이것은 {recordCount + 1}번째 문장</p>

    </div>
  )
}

export default RecordingPage;