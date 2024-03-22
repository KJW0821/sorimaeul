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
  const [isLoaded, setIsLoaded] = useState(false);

  const getScriptData = async () => {
    const res = await getScripts();
    setScripts(() => res.scripts);
    console.log(res.scripts)
    setIsLoaded(true);
  };

  useEffect(() => {
    getScriptData();
  }, [])

  return (
    <>
      {
        isLoaded &&
        <div>
          <p>이것은 {recordCount + 1}번째 문장</p>
          <p>{scripts[recordCount].script}</p>
        </div>
      }
    </>
  )
}

export default RecordingPage;