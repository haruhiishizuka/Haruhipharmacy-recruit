import React from 'react';
import { motion } from 'framer-motion';

const TabNavigation = ({ tabs, activeTab, onChange }) => {
  // アニメーションのバリアント
  const tabVariants = {
    inactive: { 
      color: 'var(--neutral-600)',
      backgroundColor: 'var(--neutral-100)',
      boxShadow: 'none'
    },
    active: { 
      color: 'white',
      backgroundColor: 'var(--primary-500)',
      boxShadow: '0 4px 14px rgba(0, 102, 255, 0.25)'
    },
    hover: { 
      backgroundColor: 'var(--primary-400)',
      y: -2
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="tab-navigation mb-6">
      {/* タブヘッダー */}
      <div className="relative mb-1">
        <div className="absolute inset-0 bottom-2 bg-neutral-100 rounded-full -z-10"></div>
        <div className="flex overflow-x-auto space-x-2 py-1 px-1 md:px-2 rounded-full bg-neutral-100 shadow-sm">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={`px-4 py-2 rounded-full font-medium whitespace-nowrap text-sm md:text-base transition-all flex items-center`}
              initial="inactive"
              animate={activeTab === tab.id ? "active" : "inactive"}
              whileHover={activeTab === tab.id ? "active" : "hover"}
              variants={tabVariants}
            >
              {tab.icon && (
                <span className="mr-2">{tab.icon}</span>
              )}
              <span>{tab.label}</span>
            </motion.button>
          ))}
        </div>
      </div>
      
      {/* タブコンテンツ */}
      <div className="mt-8 relative bg-white rounded-xl shadow-md p-6">
        {tabs.map((tab) => (
          <div 
            key={tab.id}
            className={`tab-content ${activeTab === tab.id ? 'block' : 'hidden'}`}
          >
            {activeTab === tab.id && (
              <motion.div
                variants={contentVariants}
                initial="hidden"
                animate="visible"
              >
                <div className="mb-4 inline-block px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                  <span>{tab.label}</span>
                </div>
                {tab.content}
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TabNavigation;