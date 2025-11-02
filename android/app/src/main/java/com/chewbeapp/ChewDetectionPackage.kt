 package dev.ingenius.chewbe

import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager
import java.util.Collections

class ChewDetectionPackage : ReactPackage {
    override fun createNativeModules(reactContext: ReactApplicationContext): List<NativeModule> =
        listOf(
            ChewDetectionModule(reactContext),
            CallLogModule(reactContext)
        )

    override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>> {
        // Add your CameraPreviewViewManager here
        return listOf(
            CameraPreviewViewManager()
        )
    }
}
