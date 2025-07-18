import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TypeChart from '../charts/TypeChart';
import GlobalNavigation from '../common/GlobalNavigation';

const NewResultDisplay = ({ result, onRetryQuiz, onConsultation, onReturnHome, onNavigateToPage }) => {
  // タブ機能を削除して、1ページ表示に変更

  if (!result || !result.personalityType) {
    return (
      <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
        <p>結果データの読み込み中...</p>
      </div>
    );
  }

  const { personalityType, stressPattern, chartData } = result;
  const typeData = personalityType.typeData;

  // メインヘッダー部分 - 従来システムのカードスタイルに統一
  const ResultHeader = () => (
    <div className="card" style={{
      textAlign: 'center',
      padding: 'var(--spacing-xl)',
      backgroundColor: 'var(--neutral-primary)',
      borderRadius: 'var(--radius-large)',
      marginBottom: 'var(--spacing-xl)',
      border: '1px solid var(--neutral-200)'
    }}>
      <div style={{ fontSize: '48px', marginBottom: '10px' }}>
        {typeData.emoji}
      </div>
      
      <h1 className="heading_h2" style={{
        marginBottom: 'var(--spacing-md)',
        color: '#333333'
      }}>
        あなたのタイプ：「{typeData.label}」
      </h1>
      
      <p className="paragraph" style={{
        color: '#4a90e2',
        fontWeight: '500',
        lineHeight: '1.6',
        whiteSpace: 'pre-line',
        marginBottom: 'var(--spacing-lg)'
      }}>
        {typeData.catchphrase}
      </p>

      {/* 歴史人物の紹介 */}
      <div className="card" style={{
        backgroundColor: '#f8f9fa',
        padding: 'var(--spacing-lg)',
        borderRadius: 'var(--radius-medium)',
        border: '1px solid var(--neutral-200)',
        marginTop: 'var(--spacing-lg)'
      }}>
        <h3 className="heading_h4" style={{
          marginBottom: 'var(--spacing-md)',
          color: '#333333'
        }}>
          このタイプの歴史人物
        </h3>
        
        <p className="paragraph" style={{
          fontWeight: 'bold',
          color: '#4a90e2',
          marginBottom: 'var(--spacing-sm)'
        }}>
          {typeData.historicalFigure.name}
        </p>
        
        <blockquote style={{
          fontSize: '14px',
          fontStyle: 'italic',
          color: '#495057',
          borderLeft: '3px solid #4a90e2',
          paddingLeft: 'var(--spacing-md)',
          margin: 'var(--spacing-md) 0',
          lineHeight: '1.6'
        }}>
          "{typeData.historicalFigure.quote}"
        </blockquote>
        
        <p className="paragraph_small" style={{
          color: '#6c757d',
          lineHeight: '1.5'
        }}>
          {typeData.historicalFigure.description}
        </p>
      </div>
    </div>
  );

  // 分析結果セクション（チャート + 数値）
  const AnalysisSection = () => (
    <div className="card" style={{
      padding: 'var(--spacing-xl)',
      backgroundColor: 'var(--neutral-primary)',
      borderRadius: 'var(--radius-large)',
      marginBottom: 'var(--spacing-xl)',
      border: '1px solid var(--neutral-200)'
    }}>
      <h2 className="heading_h3" style={{ 
        marginBottom: 'var(--spacing-lg)', 
        color: '#333333' 
      }}>
        科学的分析結果
      </h2>
      
      <TypeChart chartData={chartData} personalityType={personalityType} />
      
      {/* 分析サマリー */}
      <div className="card" style={{
        marginTop: 'var(--spacing-xl)',
        padding: 'var(--spacing-lg)',
        backgroundColor: '#f8f9fa',
        borderRadius: 'var(--radius-medium)',
        border: '1px solid var(--neutral-200)'
      }}>
        <h3 className="heading_h4" style={{ 
          marginBottom: 'var(--spacing-md)', 
          color: '#333333' 
        }}>
          あなたの特性サマリー
        </h3>
        
        <div className="grid_2-col gap-medium">
          <div>
            <h4 className="paragraph" style={{ 
              fontWeight: 'bold', 
              color: '#4a90e2', 
              marginBottom: 'var(--spacing-xs)' 
            }}>
              主要RIASEC特性
            </h4>
            <p className="heading_h4" style={{ 
              color: '#333333',
              marginBottom: 'var(--spacing-xs)'
            }}>
              {personalityType.riasec} 
            </p>
            <p className="paragraph_small" style={{ color: '#666666' }}>
              {getRIASECDescription(personalityType.riasec)}
            </p>
          </div>
          
          <div>
            <h4 className="paragraph" style={{ 
              fontWeight: 'bold', 
              color: '#28a745', 
              marginBottom: 'var(--spacing-xs)' 
            }}>
              行動スタイル
            </h4>
            <p className="heading_h4" style={{ 
              color: '#333333',
              marginBottom: 'var(--spacing-xs)'
            }}>
              {personalityType.behavior}
            </p>
            <p className="paragraph_small" style={{ color: '#666666' }}>
              {getBehaviorDescription(personalityType.behavior)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  // 特徴セクション
  const TraitsSection = () => (
    <motion.div
      key="traits"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px', color: '#333' }}>
        ✨ 通常時のあなたの特徴
      </h2>
      
      <div style={{
        backgroundColor: '#fff',
        padding: '25px',
        borderRadius: '12px',
        border: '1px solid #e9ecef',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
      }}>
        <h3 style={{
          fontSize: '18px',
          fontWeight: 'bold',
          marginBottom: '15px',
          color: '#4a90e2'
        }}>
          普段のあなたは...
        </h3>
        
        <ul style={{
          listStyle: 'none',
          padding: 0,
          lineHeight: '1.8'
        }}>
          {typeData.normalTraits.map((trait, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              style={{
                padding: '10px 0',
                borderBottom: index < typeData.normalTraits.length - 1 ? '1px solid #f1f3f4' : 'none',
                fontSize: '15px',
                color: '#495057'
              }}
            >
              <span style={{ color: '#4a90e2', marginRight: '10px' }}>✓</span>
              {trait}
            </motion.li>
          ))}
        </ul>
      </div>
      
      {/* 医療現場での強み */}
      <div style={{
        marginTop: '20px',
        backgroundColor: '#e8f4fd',
        padding: '20px',
        borderRadius: '8px',
        border: '1px solid #bee5eb'
      }}>
        <h3 style={{
          fontSize: '16px',
          fontWeight: 'bold',
          marginBottom: '10px',
          color: '#0c5460'
        }}>
          🏥 医療現場での強み
        </h3>
        <p style={{
          fontSize: '14px',
          color: '#0c5460',
          lineHeight: '1.6'
        }}>
          あなたのタイプは医療現場において、{getStrengthDescription(typeData.id)}という特徴を活かして貢献できます。
        </p>
      </div>
    </motion.div>
  );

  // ストレス時セクション
  const StressSection = () => (
    <motion.div
      key="stress"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px', color: '#333' }}>
        ⚠️ ストレス時の注意ポイント
      </h2>
      
      {/* ストレス時の傾向 */}
      <div style={{
        backgroundColor: '#fff3cd',
        padding: '20px',
        borderRadius: '8px',
        border: '1px solid #ffeaa7',
        marginBottom: '20px'
      }}>
        <h3 style={{
          fontSize: '18px',
          fontWeight: 'bold',
          marginBottom: '10px',
          color: '#856404'
        }}>
          {typeData.stressTraits.description}
        </h3>
        
        <div style={{ marginBottom: '15px' }}>
          <h4 style={{
            fontSize: '16px',
            fontWeight: 'bold',
            marginBottom: '10px',
            color: '#dc3545'
          }}>
            こんな傾向が出る場合があります：
          </h4>
          
          <ul style={{ marginLeft: '20px', lineHeight: '1.6' }}>
            {typeData.stressTraits.symptoms.map((symptom, index) => (
              <li key={index} style={{
                fontSize: '14px',
                color: '#721c24',
                marginBottom: '8px'
              }}>
                {symptom}
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h4 style={{
            fontSize: '16px',
            fontWeight: 'bold',
            marginBottom: '10px',
            color: '#155724'
          }}>
            💡 ストレス時の対処法：
          </h4>
          
          <ul style={{ marginLeft: '20px', lineHeight: '1.6' }}>
            {typeData.stressTraits.coping.map((coping, index) => (
              <li key={index} style={{
                fontSize: '14px',
                color: '#155724',
                marginBottom: '8px'
              }}>
                {coping}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 個別ストレス分析結果 */}
      {stressPattern && (
        <div style={{
          backgroundColor: '#f8d7da',
          padding: '20px',
          borderRadius: '8px',
          border: '1px solid #f5c6cb'
        }}>
          <h3 style={{
            fontSize: '16px',
            fontWeight: 'bold',
            marginBottom: '10px',
            color: '#721c24'
          }}>
            📋 あなたのストレスパターン分析
          </h3>
          
          <p style={{
            fontSize: '14px',
            fontWeight: 'bold',
            color: '#721c24',
            marginBottom: '10px'
          }}>
            主要パターン: {stressPattern.description.title}
          </p>
          
          <p style={{
            fontSize: '13px',
            color: '#721c24',
            lineHeight: '1.6',
            marginBottom: '15px'
          }}>
            {stressPattern.description.description}
          </p>
          
          <div style={{
            backgroundColor: '#fff',
            padding: '15px',
            borderRadius: '6px',
            border: '1px solid #f5c6cb'
          }}>
            <p style={{
              fontSize: '13px',
              color: '#721c24',
              marginBottom: '10px',
              fontWeight: 'bold'
            }}>
              ⚠️ {stressPattern.description.warning}
            </p>
            
            <ul style={{ marginLeft: '15px' }}>
              {stressPattern.description.coping.map((tip, index) => (
                <li key={index} style={{
                  fontSize: '12px',
                  color: '#721c24',
                  lineHeight: '1.5',
                  marginBottom: '5px'
                }}>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </motion.div>
  );

  // 職場適性セクション
  const WorkplaceSection = () => (
    <motion.div
      key="workplace"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px', color: '#333' }}>
        🏥 あなたに合う職場環境
      </h2>
      
      {/* 最適な職場 */}
      <div style={{
        backgroundColor: '#d4edda',
        padding: '20px',
        borderRadius: '8px',
        border: '1px solid #c3e6cb',
        marginBottom: '20px'
      }}>
        <h3 style={{
          fontSize: '18px',
          fontWeight: 'bold',
          marginBottom: '15px',
          color: '#155724'
        }}>
          🌟 最も力を発揮できる職場：
        </h3>
        
        <ul style={{ marginLeft: '20px', lineHeight: '1.8' }}>
          {typeData.workplacePreferences.ideal.map((workplace, index) => (
            <li key={index} style={{
              fontSize: '15px',
              color: '#155724',
              marginBottom: '8px',
              fontWeight: '500'
            }}>
              {workplace}
            </li>
          ))}
        </ul>
      </div>
      
      {/* 適性のある職場 */}
      <div style={{
        backgroundColor: '#fff3cd',
        padding: '20px',
        borderRadius: '8px',
        border: '1px solid #ffeaa7',
        marginBottom: '20px'
      }}>
        <h3 style={{
          fontSize: '18px',
          fontWeight: 'bold',
          marginBottom: '15px',
          color: '#856404'
        }}>
          ✅ 適性のある職場：
        </h3>
        
        <ul style={{ marginLeft: '20px', lineHeight: '1.8' }}>
          {typeData.workplacePreferences.suitable.map((workplace, index) => (
            <li key={index} style={{
              fontSize: '15px',
              color: '#856404',
              marginBottom: '8px'
            }}>
              {workplace}
            </li>
          ))}
        </ul>
      </div>
      
      {/* 慎重に検討したい職場 */}
      <div style={{
        backgroundColor: '#f8d7da',
        padding: '20px',
        borderRadius: '8px',
        border: '1px solid #f5c6cb'
      }}>
        <h3 style={{
          fontSize: '18px',
          fontWeight: 'bold',
          marginBottom: '15px',
          color: '#721c24'
        }}>
          🤔 慎重に検討したい職場：
        </h3>
        
        <ul style={{ marginLeft: '20px', lineHeight: '1.8' }}>
          {typeData.workplacePreferences.challenging.map((workplace, index) => (
            <li key={index} style={{
              fontSize: '15px',
              color: '#721c24',
              marginBottom: '8px'
            }}>
              {workplace}
            </li>
          ))}
        </ul>
        
        <p style={{
          fontSize: '13px',
          color: '#721c24',
          marginTop: '15px',
          lineHeight: '1.6',
          fontStyle: 'italic'
        }}>
          ※ これらの職場でも、チーム構成や業務内容によっては十分に活躍できる可能性があります。
        </p>
      </div>
    </motion.div>
  );

  // 成長セクション
  const DevelopmentSection = () => (
    <motion.div
      key="development"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px', color: '#333' }}>
        📈 成長のヒント
      </h2>
      
      <div style={{
        backgroundColor: '#e8f4fd',
        padding: '25px',
        borderRadius: '12px',
        border: '1px solid #bee5eb'
      }}>
        <h3 style={{
          fontSize: '18px',
          fontWeight: 'bold',
          marginBottom: '20px',
          color: '#0c5460'
        }}>
          🤝 チームでの活かし方
        </h3>
        
        <p style={{
          fontSize: '15px',
          color: '#0c5460',
          lineHeight: '1.7',
          marginBottom: '20px'
        }}>
          あなたの{typeData.label}タイプは、チーム医療において{getTeamContribution(typeData.id)}という独特な価値を提供します。
        </p>
        
        <h3 style={{
          fontSize: '18px',
          fontWeight: 'bold',
          marginBottom: '15px',
          color: '#0c5460'
        }}>
          🎯 キャリア発展のための行動
        </h3>
        
        <ul style={{
          listStyle: 'none',
          padding: 0
        }}>
          {getCareerAdvice(typeData.id).map((advice, index) => (
            <li key={index} style={{
              padding: '10px 0',
              fontSize: '14px',
              color: '#0c5460',
              lineHeight: '1.6',
              borderBottom: index < getCareerAdvice(typeData.id).length - 1 ? '1px solid #bee5eb' : 'none'
            }}>
              <span style={{ color: '#4a90e2', marginRight: '8px' }}>▶</span>
              {advice}
            </li>
          ))}
        </ul>
      </div>
      
      {/* 相性の良いタイプ */}
      <div style={{
        marginTop: '20px',
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        border: '1px solid #e9ecef'
      }}>
        <h3 style={{
          fontSize: '16px',
          fontWeight: 'bold',
          marginBottom: '15px',
          color: '#333'
        }}>
          🤝 相性の良いタイプ
        </h3>
        
        <p style={{
          fontSize: '14px',
          color: '#495057',
          lineHeight: '1.6'
        }}>
          {getCompatibleTypes(typeData.id)}
        </p>
      </div>
    </motion.div>
  );

  // アクションボタン - 従来システムと統一
  const ActionButtons = () => (
    <div className="card" style={{
      marginTop: 'var(--spacing-xl)',
      padding: 'var(--spacing-xl)',
      backgroundColor: 'var(--neutral-primary)',
      borderRadius: 'var(--radius-large)',
      textAlign: 'center',
      border: '1px solid var(--neutral-200)'
    }}>
      <h3 className="heading_h3" style={{
        marginBottom: 'var(--spacing-lg)',
        color: '#333333'
      }}>
        次のステップ
      </h3>
      
      <div className="flex_horizontal" style={{
        justifyContent: 'center',
        gap: 'var(--spacing-md)',
        flexWrap: 'wrap'
      }}>
        <motion.button
          onClick={onConsultation}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="button"
          style={{
            backgroundColor: '#333333',
            color: '#ffffff',
            border: 'none',
            padding: 'var(--spacing-md) var(--spacing-lg)',
            fontSize: '16px',
            fontWeight: 'bold'
          }}
        >
          無料キャリア相談
        </motion.button>
        
        <motion.button
          onClick={onRetryQuiz}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="button is-secondary"
          style={{
            backgroundColor: 'transparent',
            color: '#333333',
            border: '2px solid #333333',
            padding: 'var(--spacing-md) var(--spacing-lg)',
            fontSize: '16px',
            fontWeight: 'bold'
          }}
        >
          もう一度診断
        </motion.button>
        
        <motion.button
          onClick={onReturnHome}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="button is-secondary"
          style={{
            backgroundColor: 'transparent',
            color: '#333333',
            border: '2px solid #333333',
            padding: 'var(--spacing-md) var(--spacing-lg)',
            fontSize: '16px',
            fontWeight: 'bold'
          }}
        >
          ホームに戻る
        </motion.button>
      </div>
    </div>
  );

  // 通常時の特徴セクション（文章形式）
  const NormalTraitsSection = () => (
    <div className="card" style={{
      padding: 'var(--spacing-xl)',
      backgroundColor: 'var(--neutral-primary)',
      borderRadius: 'var(--radius-large)',
      marginBottom: 'var(--spacing-xl)',
      border: '1px solid var(--neutral-200)'
    }}>
      <h2 className="heading_h3" style={{ 
        marginBottom: 'var(--spacing-lg)', 
        color: '#333333' 
      }}>
        通常時のあなたの特徴
      </h2>
      
      <div style={{
        lineHeight: '1.8',
        fontSize: '16px',
        color: '#495057'
      }}>
        <p className="paragraph" style={{ marginBottom: 'var(--spacing-md)' }}>
          あなたの{typeData.label}タイプは、日常の業務において以下のような特徴を発揮します。
        </p>
        
        <p className="paragraph" style={{ marginBottom: 'var(--spacing-md)' }}>
          {typeData.normalTraits.slice(0, 3).join('、')}といった特性があり、
          {typeData.normalTraits.slice(3, 5).join('、')}という側面も持ち合わせています。
        </p>
        
        <p className="paragraph" style={{ marginBottom: 'var(--spacing-md)' }}>
          これらの特徴により、医療現場において{getStrengthDescription(typeData.id)}を発揮し、
          チーム全体の質の向上に貢献することができます。
        </p>
        
        <div className="card" style={{
          backgroundColor: '#f8f9fa',
          padding: 'var(--spacing-lg)',
          borderRadius: 'var(--radius-medium)',
          border: '1px solid var(--neutral-200)',
          marginTop: 'var(--spacing-lg)'
        }}>
          <p className="paragraph" style={{
            fontWeight: '600',
            color: '#4a90e2',
            marginBottom: 'var(--spacing-sm)'
          }}>
            医療現場での強み
          </p>
          <p className="paragraph_small" style={{
            color: '#495057',
            lineHeight: '1.6'
          }}>
            あなたのタイプは医療現場において、{getStrengthDescription(typeData.id)}という特徴を活かして貢献できます。
            これにより、患者さんにより良いケアを提供し、医療チーム全体の成果向上に寄与します。
          </p>
        </div>
      </div>
    </div>
  );

  // ストレス時の注意ポイントセクション（文章形式）
  const StressWarningSection = () => (
    <div className="card" style={{
      padding: 'var(--spacing-xl)',
      backgroundColor: '#fff3cd',
      borderRadius: 'var(--radius-large)',
      marginBottom: 'var(--spacing-xl)',
      border: '1px solid #ffeaa7'
    }}>
      <h2 className="heading_h3" style={{ 
        marginBottom: 'var(--spacing-lg)', 
        color: '#856404' 
      }}>
        ストレス時の注意ポイント
      </h2>
      
      <div style={{
        lineHeight: '1.8',
        fontSize: '16px',
        color: '#721c24'
      }}>
        <p className="paragraph" style={{ marginBottom: 'var(--spacing-md)' }}>
          {typeData.stressTraits.description}という状況になると、
          通常の優れた特徴が過度に発揮され、かえって問題となる場合があります。
        </p>
        
        <p className="paragraph" style={{ marginBottom: 'var(--spacing-md)' }}>
          具体的には、{typeData.stressTraits.symptoms.slice(0, 2).join('、')}といった傾向が現れ、
          {typeData.stressTraits.symptoms.slice(2, 4).join('や')}といった状態になることがあります。
        </p>
        
        {stressPattern && (
          <div className="card" style={{
            backgroundColor: '#fff',
            padding: 'var(--spacing-lg)',
            borderRadius: 'var(--radius-medium)',
            border: '1px solid #f5c6cb',
            marginBottom: 'var(--spacing-md)'
          }}>
            <p className="paragraph" style={{
              fontWeight: '600',
              color: '#721c24',
              marginBottom: 'var(--spacing-sm)'
            }}>
              あなたのストレスパターン: {stressPattern.description.title}
            </p>
            <p className="paragraph_small" style={{
              color: '#721c24',
              lineHeight: '1.6',
              marginBottom: 'var(--spacing-sm)'
            }}>
              {stressPattern.description.description}
            </p>
            <p className="paragraph_small" style={{
              color: '#856404',
              fontWeight: '500'
            }}>
              {stressPattern.description.warning}
            </p>
          </div>
        )}
        
        <p className="paragraph" style={{ marginBottom: 'var(--spacing-md)' }}>
          このような状況を避けるために、{typeData.stressTraits.coping.slice(0, 2).join('、')}といった対処法を心がけ、
          定期的に{typeData.stressTraits.coping.slice(2, 4).join('や')}することが効果的です。
        </p>
      </div>
    </div>
  );

  // あなたに合う職場環境セクション（文章形式）
  const WorkplaceEnvironmentSection = () => (
    <div className="card" style={{
      padding: 'var(--spacing-xl)',
      backgroundColor: 'var(--neutral-primary)',
      borderRadius: 'var(--radius-large)',
      marginBottom: 'var(--spacing-xl)',
      border: '1px solid var(--neutral-200)'
    }}>
      <h2 className="heading_h3" style={{ 
        marginBottom: 'var(--spacing-lg)', 
        color: '#333333' 
      }}>
        あなたに合う職場環境
      </h2>
      
      <div style={{
        lineHeight: '1.8',
        fontSize: '16px',
        color: '#495057'
      }}>
        <p className="paragraph" style={{ marginBottom: 'var(--spacing-md)' }}>
          あなたの{typeData.label}タイプが最も力を発揮できるのは、
          {typeData.workplacePreferences.ideal.slice(0, 2).join('や')}といった環境です。
        </p>
        
        <p className="paragraph" style={{ marginBottom: 'var(--spacing-md)' }}>
          また、{typeData.workplacePreferences.ideal.slice(2, 4).join('、')}という特徴を持つ職場でも
          十分に適性を発揮することができるでしょう。
        </p>
        
        <div className="card" style={{
          backgroundColor: '#d4edda',
          padding: 'var(--spacing-lg)',
          borderRadius: 'var(--radius-medium)',
          border: '1px solid #c3e6cb',
          marginBottom: 'var(--spacing-md)'
        }}>
          <p className="paragraph" style={{
            fontWeight: '600',
            color: '#155724',
            marginBottom: 'var(--spacing-sm)'
          }}>
            最適な職場環境
          </p>
          <p className="paragraph_small" style={{
            color: '#155724',
            lineHeight: '1.6'
          }}>
            {typeData.workplacePreferences.ideal.join('、')}といった環境で、
            あなたの持つ専門性と人間性を最大限に活かすことができます。
          </p>
        </div>
        
        <p className="paragraph" style={{ marginBottom: 'var(--spacing-md)' }}>
          一方で、{typeData.workplacePreferences.challenging.slice(0, 2).join('や')}といった環境では、
          あなたの特性を活かしにくい場合があります。ただし、チーム構成や業務内容によっては
          十分に活躍できる可能性もあるため、総合的に判断することが大切です。
        </p>
      </div>
    </div>
  );

  // 成長のヒントセクション（文章形式）
  const GrowthTipsSection = () => (
    <div className="card" style={{
      padding: 'var(--spacing-xl)',
      backgroundColor: '#e8f4fd',
      borderRadius: 'var(--radius-large)',
      marginBottom: 'var(--spacing-xl)',
      border: '1px solid #bee5eb'
    }}>
      <h2 className="heading_h3" style={{ 
        marginBottom: 'var(--spacing-lg)', 
        color: '#0c5460' 
      }}>
        成長のヒント
      </h2>
      
      <div style={{
        lineHeight: '1.8',
        fontSize: '16px',
        color: '#0c5460'
      }}>
        <p className="paragraph" style={{ marginBottom: 'var(--spacing-md)' }}>
          あなたの{typeData.label}タイプは、チーム医療において
          {getTeamContribution(typeData.id)}という独特な価値を提供します。
        </p>
        
        <p className="paragraph" style={{ marginBottom: 'var(--spacing-md)' }}>
          キャリアをさらに発展させるためには、
          {getCareerAdvice(typeData.id).slice(0, 2).join('、')}といった取り組みが効果的です。
        </p>
        
        <div className="card" style={{
          backgroundColor: '#fff',
          padding: 'var(--spacing-lg)',
          borderRadius: 'var(--radius-medium)',
          border: '1px solid #bee5eb',
          marginBottom: 'var(--spacing-md)'
        }}>
          <p className="paragraph" style={{
            fontWeight: '600',
            color: '#0c5460',
            marginBottom: 'var(--spacing-sm)'
          }}>
            チームでの活かし方
          </p>
          <p className="paragraph_small" style={{
            color: '#0c5460',
            lineHeight: '1.6'
          }}>
            {getCompatibleTypes(typeData.id)}
          </p>
        </div>
        
        <p className="paragraph" style={{ marginBottom: 'var(--spacing-md)' }}>
          また、{getCareerAdvice(typeData.id).slice(2, 4).join('や')}といった経験を積むことで、
          より幅広い場面であなたの強みを発揮できるようになるでしょう。
        </p>
        
        <p className="paragraph">
          継続的な学習と経験を通じて、医療現場でのリーダーシップを発揮し、
          患者さんと医療チーム双方に価値を提供できる専門職として成長していくことができます。
        </p>
      </div>
    </div>
  );

  return (
    <div className="page_container" style={{ minHeight: '100vh', backgroundColor: 'var(--neutral-50)' }}>
      {/* Navigation */}
      <GlobalNavigation 
        onReturnHome={onReturnHome}
        onNavigateToPage={onNavigateToPage}
        onConsultation={onConsultation}
        onStartQuiz={() => {}}
        activeRoute="/new-quiz"
      />

      {/* Header */}
      <header className="section" style={{ padding: 'var(--spacing-md) 0' }}>
        <div className="container">
          <div className="header is-align-center">
            <div className="eyebrow">新16タイプ診断 - 結果</div>
            <h1 className="heading_h2">診断結果</h1>
            <p className="paragraph" style={{ color: '#333333' }}>
              あなたの性格タイプと適性をご確認ください
            </p>
          </div>
        </div>
      </header>

      {/* Main Content - 1ページ表示 */}
      <section className="section">
        <div className="container">
          <ResultHeader />
          <AnalysisSection />
          <NormalTraitsSection />
          <StressWarningSection />
          <WorkplaceEnvironmentSection />
          <GrowthTipsSection />
          <ActionButtons />
        </div>
      </section>
    </div>
  );
};

// ヘルパー関数
const getRIASECDescription = (riasec) => {
  const descriptions = {
    Realistic: "物や道具を扱い、技術的な作業を好む",
    Investigative: "研究・分析・探究を重視する",
    Artistic: "創造性・独創性を大切にする",
    Social: "人との関わり・支援を重視する",
    Enterprising: "リーダーシップ・成果達成を好む",
    Conventional: "秩序・ルール・正確性を重視する"
  };
  return descriptions[riasec] || "";
};

const getBehaviorDescription = (behavior) => {
  const descriptions = {
    Supporting: "他者をサポートし、協調を重視",
    Controlling: "リーダーシップを発揮し、主導権を握る",
    Conserving: "安定性と継続性を重視",
    Adapting: "柔軟性と変化への対応を得意とする"
  };
  return descriptions[behavior] || "";
};

const getStrengthDescription = (typeId) => {
  const strengths = {
    research_master: "深い専門知識と分析力",
    tech_craftsman: "確実な技術力と職人気質",
    safety_guardian: "安全管理と品質向上への献身",
    data_analyst: "データ分析と改善提案能力",
    team_supporter: "チーム全体への配慮とサポート",
    empathy_listener: "共感力と傾聴スキル",
    team_coordinator: "調整力とバランス感覚",
    mentor_master: "人材育成と指導力",
    field_commander: "緊急時の判断力とリーダーシップ",
    change_agent: "革新的思考と変革推進力",
    org_manager: "組織運営と戦略的思考",
    project_leader: "目標達成力と推進力",
    multi_player: "多様な場面への適応力",
    pinch_hitter: "緊急時の対応力と機動力",
    idea_generator: "創造性とアイデア創出力",
    coordinator: "異なる立場の人々をつなぐ調整力"
  };
  return strengths[typeId] || "専門性と人間性のバランス";
};

const getTeamContribution = (typeId) => {
  const contributions = {
    research_master: "エビデンスに基づいた専門的な視点",
    tech_craftsman: "確実で質の高い技術提供",
    safety_guardian: "安全性と品質保証の要",
    data_analyst: "客観的な分析と改善提案",
    team_supporter: "チーム全体の結束力向上",
    empathy_listener: "患者さんや同僚の心のケア",
    team_coordinator: "意見の調整と合意形成",
    mentor_master: "次世代育成と知識継承",
    field_commander: "緊急時の指揮統制",
    change_agent: "組織の革新と改善推進",
    org_manager: "効率的な組織運営",
    project_leader: "目標達成に向けた推進力",
    multi_player: "様々な役割への柔軟な対応",
    pinch_hitter: "困難な状況での問題解決",
    idea_generator: "創造的な解決策の提案",
    coordinator: "多職種連携の促進"
  };
  return contributions[typeId] || "バランスの取れた総合力";
};

const getCareerAdvice = (typeId) => {
  const advice = {
    research_master: [
      "学会発表や研究活動への積極的な参加",
      "専門資格の取得と知識の深化",
      "他分野の専門家との連携強化",
      "後進への知識継承活動"
    ],
    safety_guardian: [
      "医療安全管理者資格の取得",
      "他部署の安全対策見学と学習",
      "ヒヤリハット分析の専門性向上",
      "安全文化醸成のリーダーシップ発揮"
    ]
    // 他のタイプも同様に定義...
  };
  return advice[typeId] || [
    "自分の強みを活かせる分野での専門性向上",
    "多職種との連携スキル強化",
    "継続的な学習と成長",
    "後輩指導やメンタリング経験"
  ];
};

const getCompatibleTypes = (typeId) => {
  const compatibility = {
    safety_guardian: "「アイデア提案者」- あなたが安全性をチェックし、相手のアイデアを実現可能にする。「現場指揮官」- あなたが安定した基盤を作り、相手がスピーディに判断する。",
    research_master: "「チームサポーター」- あなたの専門知識と相手の人間力で患者さんに最適なケアを提供。「現場指揮官」- あなたの分析力と相手の実行力で効果的な医療を実現。"
    // 他のタイプも同様に定義...
  };
  return compatibility[typeId] || "多様なタイプとの連携により、それぞれの強みを活かしたチーム医療を実現できます。";
};

export default NewResultDisplay;