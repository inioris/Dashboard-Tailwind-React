import React, { FC } from 'react';
import DashboardLayout from "./dashboard/layout";


const App: FC = () => {
  console.log(window?.location)
  return (
      <>
      <DashboardLayout>
                <div className="bg-white">
                    <p>
                      Edit <code>src/App.tsx</code> and save to reload.
                    </p>

                </div>
      </DashboardLayout>

      </>
  );
}

export default App;
