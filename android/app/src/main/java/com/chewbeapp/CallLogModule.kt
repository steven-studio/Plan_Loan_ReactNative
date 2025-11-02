package dev.ingenius.chewbe

import android.Manifest
import android.content.pm.PackageManager
import android.provider.CallLog
import androidx.core.content.ContextCompat
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableMap

class CallLogModule(private val reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String = "CallLogModule"

    @ReactMethod
    fun getRecentCalls(options: ReadableMap?, promise: Promise) {
        val context = reactContext
        if (
            ContextCompat.checkSelfPermission(context, Manifest.permission.READ_CALL_LOG) !=
            PackageManager.PERMISSION_GRANTED
        ) {
            promise.reject(
                "E_PERMISSION",
                "READ_CALL_LOG permission not granted. Request it before calling getRecentCalls."
            )
            return
        }

        val limit = if (options != null && options.hasKey("limit")) {
            options.getInt("limit").coerceAtLeast(1)
        } else {
            DEFAULT_LIMIT
        }

        val minTimestamp = if (options != null && options.hasKey("since")) {
            options.getDouble("since").toLong()
        } else {
            0L
        }

        val logsArray = Arguments.createArray()
        val projection = arrayOf(
            CallLog.Calls.NUMBER,
            CallLog.Calls.TYPE,
            CallLog.Calls.DURATION,
            CallLog.Calls.DATE,
            CallLog.Calls.CACHED_NAME,
            CallLog.Calls.COUNTRY_ISO
        )

        val selection = if (minTimestamp > 0L) {
            "${CallLog.Calls.DATE} >= ?"
        } else {
            null
        }
        val selectionArgs = if (minTimestamp > 0L) {
            arrayOf(minTimestamp.toString())
        } else {
            null
        }

        try {
            context.contentResolver.query(
                CallLog.Calls.CONTENT_URI,
                projection,
                selection,
                selectionArgs,
                "${CallLog.Calls.DATE} DESC"
            )?.use { cursor ->
                var count = 0
                val numberIndex = cursor.getColumnIndexOrThrow(CallLog.Calls.NUMBER)
                val typeIndex = cursor.getColumnIndexOrThrow(CallLog.Calls.TYPE)
                val durationIndex = cursor.getColumnIndexOrThrow(CallLog.Calls.DURATION)
                val dateIndex = cursor.getColumnIndexOrThrow(CallLog.Calls.DATE)
                val nameIndex = cursor.getColumnIndex(CallLog.Calls.CACHED_NAME)
                val isoIndex = cursor.getColumnIndex(CallLog.Calls.COUNTRY_ISO)

                while (cursor.moveToNext() && count < limit) {
                    val item = Arguments.createMap().apply {
                        putString("number", cursor.getString(numberIndex))
                        putString("type", mapCallType(cursor.getInt(typeIndex)))
                        putInt("durationSeconds", cursor.getInt(durationIndex))
                        putDouble("timestamp", cursor.getLong(dateIndex).toDouble())
                        putString("cachedName", cursor.getStringOrNull(nameIndex))
                        putString("countryIso", cursor.getStringOrNull(isoIndex))
                        putNull("accountLabel")
                    }
                    logsArray.pushMap(item)
                    count++
                }
            }

            promise.resolve(logsArray)
        } catch (securityException: SecurityException) {
            promise.reject(
                "E_CALLLOG_SECURITY",
                "Unable to read call log: ${securityException.message}",
                securityException
            )
        } catch (throwable: Throwable) {
            promise.reject(
                "E_CALLLOG_UNKNOWN",
                "Failed to read call log: ${throwable.message}",
                throwable
            )
        }
    }

    private fun mapCallType(type: Int): String =
        when (type) {
            CallLog.Calls.INCOMING_TYPE -> "incoming"
            CallLog.Calls.OUTGOING_TYPE -> "outgoing"
            CallLog.Calls.MISSED_TYPE -> "missed"
            CallLog.Calls.VOICEMAIL_TYPE -> "voicemail"
            CallLog.Calls.REJECTED_TYPE -> "rejected"
            CallLog.Calls.BLOCKED_TYPE -> "blocked"
            CallLog.Calls.ANSWERED_EXTERNALLY_TYPE -> "answeredExternally"
            else -> "unknown"
        }

    private fun android.database.Cursor.getStringOrNull(index: Int): String? =
        if (index >= 0) getString(index) else null

    companion object {
        private const val DEFAULT_LIMIT = 50
    }
}
