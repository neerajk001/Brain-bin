import React from 'react'
import {Share2} from 'lucide-react'

function Bottom() {
  return (
     <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8 border">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Recent Saves</h3>
                    <Share2 className="h-5 w-5 text-gray-400" />
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <span className="text-blue-600 font-semibold text-sm">TW</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">Amazing design inspiration thread</p>
                        <p className="text-xs text-gray-500">Twitter • 2 hours ago</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
                        <span className="text-pink-600 font-semibold text-sm">IG</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">Productivity tips for developers</p>
                        <p className="text-xs text-gray-500">Instagram • 5 hours ago</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                        <span className="text-red-600 font-semibold text-sm">YT</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">React best practices tutorial</p>
                        <p className="text-xs text-gray-500">YouTube • 1 day ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
                </div>

  )
}

export default Bottom