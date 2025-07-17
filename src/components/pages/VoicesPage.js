import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlobalNavigation from '../common/GlobalNavigation';

const VoicesPage = ({ onReturnHome, onStartQuiz, onNavigateToPage, onConsultation }) => {
  const [selectedVoice, setSelectedVoice] = useState(null);

  // 先輩の声データ
  const voices = [
    {
      id: 1,
      name: '田中 美恵',
      profession: '看護師',
      workplace: '総合病院',
      experience: '5年目',
      age: '28歳',
      image: '/images/webflow/6876f466bdb449ceb8ef2f51_340166c9-1e93-4040-829a-d0d756783c57.avif',
      category: '急性期医療',
      title: 'MediMatchで理想のICU看護師として新しいスタートを切れました',
      excerpt: 'これまでの病棟勤務から、念願だったICU勤務への転職を実現。専門性を高めながら、充実した毎日を送っています。',
      content: `
        <h2>転職のきっかけ</h2>
        <p>新卒から5年間、一般病棟で勤務していましたが、もっと専門性を高めたいという思いが強くなりました。特に重症患者のケアに興味があり、ICU勤務を希望していました。</p>

        <h2>MediMatchとの出会い</h2>
        <p>転職活動をしている中で、友人からMediMatchを紹介されました。一般的な転職サイトとは違い、私の希望する職場に直接アプローチしてくれるという点に魅力を感じました。</p>

        <h2>転職活動の流れ</h2>
        <p>担当のコンサルタントの方が本当に親身になって相談に乗ってくれました。私の経験やスキル、将来の目標を詳しくヒアリングし、それに合った医療機関を提案してくれました。</p>

        <h3>特に印象的だったこと</h3>
        <ul>
          <li>希望する病院の詳細な情報を提供してくれた</li>
          <li>面接対策を丁寧にサポートしてくれた</li>
          <li>給与交渉も代行してくれた</li>
          <li>転職後もフォローアップをしてくれている</li>
        </ul>

        <h2>現在の職場について</h2>
        <p>現在は都内の総合病院のICUで勤務しています。最新の医療機器に囲まれ、重症患者のケアに携わることで、毎日が学びの連続です。</p>

        <p>職場の雰囲気も良く、先輩方も優しく指導してくださいます。以前の職場では残業が多かったのですが、現在の職場では働き方改革が進んでおり、プライベートとのバランスも取れています。</p>

        <h2>今後の目標</h2>
        <p>将来的には集中ケア認定看護師の資格取得を目指しています。現在の職場では資格取得支援制度があり、勉強会も充実しているので、着実にスキルアップできています。</p>

        <h2>転職を考えている方へのメッセージ</h2>
        <p>転職は人生の大きな決断です。一人で悩まず、MediMatchのような信頼できるパートナーと一緒に進めることをお勧めします。きっと理想のキャリアを実現できるはずです。</p>
      `,
      tags: ['急性期', 'ICU', 'スキルアップ', 'ワークライフバランス']
    },
    {
      id: 2,
      name: '佐藤 健太',
      profession: '薬剤師',
      workplace: '地域薬局',
      experience: '3年目',
      age: '26歳',
      image: '/images/webflow/6876f466bdb449ceb8ef2f51_340166c9-1e93-4040-829a-d0d756783c57.avif',
      category: '地域医療',
      title: '病院薬剤師から地域薬局へ。患者さんとの距離が近い医療を実現',
      excerpt: '病院での経験を活かし、地域の患者さんにより深く関わる薬剤師として新たなキャリアをスタートしました。',
      content: `
        <h2>転職の背景</h2>
        <p>新卒から病院薬剤師として3年間勤務していましたが、患者さんとの接点が少ないことに物足りなさを感じていました。もっと患者さんの生活に密着した医療に携わりたいと考えるようになりました。</p>

        <h2>地域薬局への転職を決意</h2>
        <p>在宅医療や健康相談など、地域薬局の役割が拡大していることを知り、そこで自分のスキルを活かしたいと思いました。</p>

        <h2>MediMatchのサポート</h2>
        <p>転職活動では、MediMatchのコンサルタントの方に大変お世話になりました。地域薬局の現状や将来性について詳しく教えていただき、不安を解消することができました。</p>

        <h3>特に助かったサポート</h3>
        <ul>
          <li>地域薬局の経営状況の詳細な説明</li>
          <li>在宅医療への取り組み状況の確認</li>
          <li>薬局長との面談セッティング</li>
          <li>労働条件の交渉サポート</li>
        </ul>

        <h2>現在の仕事について</h2>
        <p>現在は地域密着型の薬局で勤務しており、調剤業務だけでなく、在宅訪問や健康相談にも携わっています。患者さんとの距離が近く、「ありがとう」の声を直接聞けることが何よりのやりがいです。</p>

        <h2>在宅医療への取り組み</h2>
        <p>在宅医療にも積極的に参加しており、医師や看護師と連携しながら、患者さんの自宅での服薬管理をサポートしています。病院時代では経験できなかった、包括的な医療に携わることができています。</p>

        <h2>今後のビジョン</h2>
        <p>将来的には認定薬剤師の資格を取得し、地域医療のスペシャリストとして成長していきたいと考えています。また、薬局の経営にも参画し、地域の健康増進に貢献したいと思っています。</p>

        <h2>転職を検討している薬剤師の方へ</h2>
        <p>転職は勇気のいることですが、新しい環境で新しいチャレンジができる貴重な機会でもあります。MediMatchのサポートがあれば、安心して転職活動を進められると思います。</p>
      `,
      tags: ['地域医療', '在宅医療', '服薬指導', '健康相談']
    },
    {
      id: 3,
      name: '山田 理恵',
      profession: '理学療法士',
      workplace: '回復期リハビリテーション病院',
      experience: '7年目',
      age: '31歳',
      image: '/images/webflow/6876f466bdb449ceb8ef2f51_340166c9-1e93-4040-829a-d0d756783c57.avif',
      category: 'リハビリテーション',
      title: '急性期から回復期へ。患者さんの「できた！」の瞬間に立ち会える喜び',
      excerpt: '急性期病院での経験を活かし、患者さんの日常生活復帰をサポートする回復期リハビリテーションの世界で活躍中です。',
      content: `
        <h2>転職のきっかけ</h2>
        <p>急性期病院で7年間勤務し、多くの経験を積むことができました。しかし、患者さんとじっくり向き合い、日常生活への復帰をサポートしたいという思いが強くなり、回復期リハビリテーション病院への転職を考えるようになりました。</p>

        <h2>回復期リハビリテーションへの興味</h2>
        <p>急性期では短期間での機能改善が主でしたが、回復期では患者さんの生活の質の向上により深く関わることができます。「歩けるようになりたい」「家に帰りたい」という患者さんの願いを実現するお手伝いがしたいと思いました。</p>

        <h2>MediMatchとの転職活動</h2>
        <p>転職を決意してから、MediMatchに相談しました。回復期リハビリテーションの特徴や求められるスキルについて詳しく説明していただき、自分の経験がどう活かせるかを一緒に考えてくれました。</p>

        <h3>印象的だったサポート</h3>
        <ul>
          <li>回復期リハビリテーション病院の見学アレンジ</li>
          <li>各病院の特色や治療方針の詳細説明</li>
          <li>患者層や平均入院期間の情報提供</li>
          <li>面接での自己PRのアドバイス</li>
        </ul>

        <h2>現在の職場環境</h2>
        <p>現在の職場は、患者さん一人ひとりとじっくり向き合える環境が整っています。多職種チームでの連携も密で、看護師、作業療法士、言語聴覚士、ソーシャルワーカーなどと協力しながら、患者さんの目標達成に向けて取り組んでいます。</p>

        <h2>やりがいを感じる瞬間</h2>
        <p>患者さんが「できなかったことができるようになった」瞬間に立ち会えることが最大のやりがいです。車椅子だった方が歩けるようになったり、食事を自分で摂れるようになったりする姿を見ると、この仕事を選んで良かったと心から思います。</p>

        <h2>スキルアップへの取り組み</h2>
        <p>現在の職場では研修制度が充実しており、認定理学療法士の取得に向けて勉強中です。また、住環境整備や福祉用具に関する知識も深めており、退院後の生活まで見据えたリハビリテーションを提供できるよう努力しています。</p>

        <h2>転職を考えている理学療法士の方へ</h2>
        <p>転職は新しい可能性を開く大きなチャンスです。自分の理想とする理学療法士像を明確にし、それを実現できる環境を見つけることが大切です。MediMatchのサポートがあれば、きっと理想の職場に出会えると思います。</p>
      `,
      tags: ['回復期リハ', '多職種連携', 'ADL向上', '住環境整備']
    },
    {
      id: 4,
      name: '鈴木 直樹',
      profession: '診療放射線技師',
      workplace: 'がん専門病院',
      experience: '4年目',
      age: '27歳',
      image: '/images/webflow/6876f466bdb449ceb8ef2f51_340166c9-1e93-4040-829a-d0d756783c57.avif',
      category: '専門医療',
      title: '一般病院からがん専門病院へ。最先端の放射線治療技術に挑戦',
      excerpt: '一般的な画像診断から放射線治療まで、がん専門病院で最先端の技術を学び、患者さんの治療に貢献しています。',
      content: `
        <h2>転職の動機</h2>
        <p>一般病院で診療放射線技師として4年間勤務していましたが、もっと専門性の高い分野に挑戦したいという気持ちが強くなりました。特にがん治療における放射線技術に興味があり、専門病院での勤務を希望するようになりました。</p>

        <h2>がん専門病院への憧れ</h2>
        <p>がん治療は放射線技師にとって非常に重要な分野です。最新の放射線治療装置を扱い、患者さんの治療に直接貢献できることに大きな魅力を感じていました。</p>

        <h2>MediMatchでの転職サポート</h2>
        <p>専門性の高い分野への転職ということで不安もありましたが、MediMatchのコンサルタントの方が放射線技師の専門領域についても詳しく、安心して相談することができました。</p>

        <h3>特に役立ったサポート</h3>
        <ul>
          <li>がん専門病院の詳細な情報提供</li>
          <li>最新設備や治療法についての説明</li>
          <li>キャリアパスの具体的なアドバイス</li>
          <li>専門領域での経験をアピールする方法</li>
        </ul>

        <h2>現在の業務内容</h2>
        <p>現在はがん専門病院で、CT、MRI、PETなどの画像診断に加えて、放射線治療計画の作成や治療装置の操作も担当しています。最新のリニアックやサイバーナイフなど、以前の職場では扱えなかった高度な装置に携わることができています。</p>

        <h2>技術向上への取り組み</h2>
        <p>がん専門病院では症例数が多く、様々な部位のがんに対する治療を経験できます。放射線治療品質管理士の資格取得も目指しており、現在勉強中です。</p>

        <h2>チーム医療への参加</h2>
        <p>がん治療はチーム医療が非常に重要です。医師、看護師、医学物理士、放射線治療専門技師などと連携しながら、患者さんにとって最適な治療を提供しています。</p>

        <h2>患者さんとの関わり</h2>
        <p>がん患者さんは治療への不安も大きいため、技術的な説明だけでなく、安心して治療を受けていただけるよう心がけています。治療後に「ありがとう」と言っていただけることが何よりの励みになります。</p>

        <h2>今後の目標</h2>
        <p>放射線治療専門技師の認定取得を目指し、将来的には治療計画や品質管理の分野でもスキルを磨いていきたいと考えています。がん治療の進歩に貢献できる技師になることが目標です。</p>

        <h2>転職を考えている放射線技師の方へ</h2>
        <p>専門性を高めたい方には、MediMatchのサポートを強くお勧めします。専門分野への転職は情報収集が重要ですが、豊富な知識と経験を持つコンサルタントがサポートしてくれるので安心です。</p>
      `,
      tags: ['がん治療', '放射線治療', '最先端技術', 'チーム医療']
    },
    {
      id: 5,
      name: '高橋 麻衣',
      profession: '管理栄養士',
      workplace: '透析クリニック',
      experience: '6年目',
      age: '29歳',
      image: '/images/webflow/6876f466bdb449ceb8ef2f51_340166c9-1e93-4040-829a-d0d756783c57.avif',
      category: '専門医療',
      title: '総合病院から透析クリニックへ。患者さんとの継続的な関係が築ける環境',
      excerpt: '総合病院での経験を活かし、透析患者さんの食事療法を専門的にサポート。長期的な関係性の中で患者さんの生活の質向上に貢献しています。',
      content: `
        <h2>転職を考えたきっかけ</h2>
        <p>総合病院で管理栄養士として6年間勤務し、様々な疾患の患者さんの栄養管理を経験しました。しかし、短期間での関わりが多く、患者さんとの継続的な関係を築きにくいことに物足りなさを感じていました。</p>

        <h2>透析医療への関心</h2>
        <p>透析患者さんは長期にわたって治療を継続するため、栄養管理も継続的に行う必要があります。患者さんの生活スタイルに合わせた食事指導ができる環境に魅力を感じ、透析クリニックへの転職を考えるようになりました。</p>

        <h2>MediMatchとの出会いと転職サポート</h2>
        <p>透析分野は専門性が高く、転職に不安もありましたが、MediMatchのコンサルタントの方が透析医療について詳しく説明してくださり、安心して転職活動を進めることができました。</p>

        <h3>印象的だったサポート内容</h3>
        <ul>
          <li>透析クリニックの特徴と役割の詳細説明</li>
          <li>透析患者さんの栄養管理の重要性について</li>
          <li>各クリニックの規模や患者層の情報提供</li>
          <li>透析専門の管理栄養士の仕事内容の説明</li>
        </ul>

        <h2>現在の職場環境</h2>
        <p>現在は透析専門クリニックで約200名の患者さんの栄養管理を担当しています。透析患者さんは週3回の通院が基本なので、定期的にお会いでき、継続的な栄養指導ができることが大きな魅力です。</p>

        <h2>透析患者さんの栄養管理</h2>
        <p>透析患者さんの栄養管理は非常に複雑で、たんぱく質、リン、カリウム、塩分など多くの制限があります。しかし、患者さん一人ひとりの生活スタイルや嗜好に合わせて、実現可能な食事プランを提案することにやりがいを感じています。</p>

        <h2>患者さんとの関わり</h2>
        <p>長期にわたる関係の中で、患者さんの体調の変化や生活の変化に合わせて栄養指導を調整していきます。「先生のおかげで検査値が良くなった」と言っていただけると、この仕事を選んで良かったと実感します。</p>

        <h2>スキルアップへの取り組み</h2>
        <p>透析療法指導士の資格取得を目指して勉強中です。また、腎臓病について更に専門的な知識を身につけるため、関連学会にも積極的に参加しています。</p>

        <h2>チーム医療での役割</h2>
        <p>透析医療では医師、看護師、臨床工学技士、ソーシャルワーカーなどとの連携が重要です。栄養面から患者さんの治療をサポートし、QOLの向上に貢献しています。</p>

        <h2>今後の目標</h2>
        <p>透析患者さんの栄養管理のスペシャリストとして、より質の高い栄養指導を提供したいと考えています。また、透析予防のための保存期腎不全患者さんの栄養指導にも携わりたいと思っています。</p>

        <h2>転職を考えている管理栄養士の方へ</h2>
        <p>専門分野への転職は勇気がいりますが、新しい専門性を身につける絶好の機会でもあります。MediMatchのサポートがあれば、安心して新しいチャレンジができると思います。</p>
      `,
      tags: ['透析医療', '腎疾患', '継続指導', '専門資格']
    },
    {
      id: 6,
      name: '中村 健一',
      profession: '作業療法士',
      workplace: '精神科病院',
      experience: '8年目',
      age: '33歳',
      image: '/images/webflow/6876f466bdb449ceb8ef2f51_340166c9-1e93-4040-829a-d0d756783c57.avif',
      category: '精神医療',
      title: '身体障害分野から精神科分野へ。新たな専門性で患者さんの社会復帰をサポート',
      excerpt: '身体障害のリハビリテーション経験を活かし、精神科作業療法で患者さんの社会復帰と生活の質向上に取り組んでいます。',
      content: `
        <h2>分野転換のきっかけ</h2>
        <p>身体障害分野で8年間作業療法士として勤務していましたが、精神保健福祉の重要性を感じ、精神科分野での作業療法に興味を持つようになりました。心の病気を抱える方々の社会復帰をサポートしたいという思いが強くなりました。</p>

        <h2>精神科作業療法への興味</h2>
        <p>身体障害分野とは異なり、精神科作業療法は患者さんの心理面や社会性に焦点を当てたアプローチが中心となります。この分野の専門性を身につけたいと考えました。</p>

        <h2>MediMatchでの転職サポート</h2>
        <p>分野を変える転職ということで不安もありましたが、MediMatchのコンサルタントの方が精神科医療についても詳しく、丁寧にサポートしてくださいました。</p>

        <h3>特に助かったサポート</h3>
        <ul>
          <li>精神科作業療法の特徴と役割の説明</li>
          <li>各病院の治療方針や患者層の情報</li>
          <li>精神科未経験者への研修制度の確認</li>
          <li>身体障害分野の経験の活かし方</li>
        </ul>

        <h2>現在の職場での活動</h2>
        <p>精神科病院で急性期から慢性期まで、様々な段階の患者さんの作業療法を担当しています。個別訓練から集団プログラムまで、患者さんの状態に応じた多様なアプローチを行っています。</p>

        <h2>精神科作業療法の特徴</h2>
        <p>精神科作業療法では、日常生活動作の改善だけでなく、対人関係の構築、ストレス対処法の習得、就労準備など、社会復帰に向けた包括的なサポートを行います。</p>

        <h2>やりがいを感じる瞬間</h2>
        <p>患者さんが自信を取り戻し、笑顔で退院していく姿を見ることが最大のやりがいです。また、社会復帰後に近況報告に来てくださることもあり、継続的な関わりができることも魅力の一つです。</p>

        <h2>多職種連携の重要性</h2>
        <p>精神科医療では医師、看護師、精神保健福祉士、臨床心理士などとの連携が非常に重要です。それぞれの専門性を活かしながら、患者さんの回復をチーム一丸となってサポートしています。</p>

        <h2>スキルアップへの取り組み</h2>
        <p>精神科作業療法士協会の研修に積極的に参加し、精神科領域の専門知識と技術の向上に努めています。また、認知行動療法についても学習を進めています。</p>

        <h2>地域との連携</h2>
        <p>退院後の患者さんの生活を支えるため、地域の就労支援事業所やデイケアセンターとの連携も重要な業務の一部です。地域全体で患者さんをサポートする体制作りに参加しています。</p>

        <h2>今後の目標</h2>
        <p>精神科作業療法のスペシャリストとして、より効果的な治療プログラムの開発に携わりたいと考えています。また、精神保健福祉士の資格取得も検討しており、より幅広い視点から患者さんをサポートしたいと思っています。</p>

        <h2>分野転換を考えている作業療法士の方へ</h2>
        <p>新しい分野への挑戦は勇気がいりますが、これまでの経験も必ず活かすことができます。MediMatchのサポートがあれば、安心して新しいステップを踏み出せると思います。</p>
      `,
      tags: ['精神科', '社会復帰', '多職種連携', '地域連携']
    }
  ];

  const handleVoiceSelect = (voice) => {
    setSelectedVoice(voice);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToList = () => {
    setSelectedVoice(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 職種でフィルタリング
  const getProfessionColor = (profession) => {
    const colors = {
      '看護師': '#e3f2fd',
      '薬剤師': '#f3e5f5',
      '理学療法士': '#e8f5e8',
      '診療放射線技師': '#fff3e0',
      '管理栄養士': '#fce4ec',
      '作業療法士': '#e0f2f1'
    };
    return colors[profession] || '#f5f5f5';
  };

  return (
    <div style={{ minHeight: '100vh', width: '100%' }}>
      {/* Navigation */}
      <GlobalNavigation 
        onReturnHome={onReturnHome}
        onNavigateToPage={onNavigateToPage}
        onConsultation={onConsultation}
        onStartQuiz={onStartQuiz}
        activeRoute="/voices"
      />

      <AnimatePresence mode="wait">
        {!selectedVoice ? (
          // Voice List View
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Hero Section */}
            <header className="section is-secondary">
              <div className="container">
                <div className="header is-align-center">
                  <div className="eyebrow">現場で働く先輩の声</div>
                  <motion.h1
                    className="heading_h2"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    style={{ color: '#675032' }}
                  >
                    MediMatchで転職を実現した先輩たちの体験談
                  </motion.h1>
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                  >
                    <p className="subheading" style={{ 
                      fontSize: '18px', 
                      fontWeight: '400', 
                      lineHeight: '1.6', 
                      maxWidth: '900px', 
                      margin: '0 auto 30px',
                      color: '#675032',
                      padding: '0 20px'
                    }}>
                      様々な職種の医療従事者がMediMatchを通じて理想のキャリアを実現。
                      リアルな体験談から、あなたの転職のヒントを見つけてください。
                    </p>
                  </motion.div>
                </div>
              </div>
            </header>

            {/* Voices Grid */}
            <section className="section">
              <div className="container">
                <div className="grid_3-col gap-large">
                  {voices.map((voice, index) => (
                    <motion.article 
                      key={voice.id}
                      className="link-content-block"
                      onClick={() => handleVoiceSelect(voice)}
                      style={{ cursor: 'pointer' }}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="card">
                        <div className="ratio_3x2 margin-bottom_medium">
                          <img 
                            alt={voice.name} 
                            src={voice.image} 
                            loading="lazy" 
                            className="image_cover"
                          />
                        </div>
                        
                        <div className="tag_group margin-bottom_small">
                          <div className="tag" style={{ 
                            backgroundColor: getProfessionColor(voice.profession), 
                            color: '#675032' 
                          }}>
                            {voice.profession}
                          </div>
                          <div className="tag" style={{ backgroundColor: '#f8f2e8', color: '#675032' }}>
                            {voice.category}
                          </div>
                        </div>
                        
                        <h3 className="heading_h4" style={{ color: '#675032' }}>
                          {voice.title}
                        </h3>
                        
                        <p className="paragraph" style={{ color: '#675032' }}>
                          {voice.excerpt}
                        </p>
                        
                        <div className="flex_horizontal is-y-center gap-small" style={{ marginTop: '16px' }}>
                          <div className="avatar">
                            <img 
                              alt={voice.name} 
                              src={voice.image} 
                              loading="lazy" 
                              className="image_cover"
                            />
                          </div>
                          <div>
                            <div className="paragraph_small margin-bottom_none" style={{ 
                              fontWeight: '600', 
                              color: '#675032' 
                            }}>
                              {voice.name}
                            </div>
                            <div className="paragraph_small margin-bottom_none" style={{ color: '#675032' }}>
                              {voice.workplace} • {voice.experience}
                            </div>
                          </div>
                        </div>
                        
                        <div className="tag_group" style={{ marginTop: '12px' }}>
                          {voice.tags.slice(0, 3).map((tag, tagIndex) => (
                            <span 
                              key={tagIndex}
                              className="tag is-inverse"
                              style={{ 
                                fontSize: '12px',
                                backgroundColor: '#675032',
                                color: '#ffffff'
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </div>
              </div>
            </section>
          </motion.div>
        ) : (
          // Individual Voice Detail View
          <motion.div
            key="detail"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
          >
            {/* Voice Header */}
            <header className="section is-secondary">
              <div className="container">
                <div className="header" style={{ maxWidth: '800px', margin: '0 auto' }}>
                  <button 
                    onClick={handleBackToList}
                    className="button is-secondary"
                    style={{ marginBottom: '20px' }}
                  >
                    ← 先輩の声一覧に戻る
                  </button>
                  
                  <div className="tag_group margin-bottom_small">
                    <div className="tag" style={{ 
                      backgroundColor: getProfessionColor(selectedVoice.profession), 
                      color: '#675032' 
                    }}>
                      {selectedVoice.profession}
                    </div>
                    <div className="tag" style={{ backgroundColor: '#f8f2e8', color: '#675032' }}>
                      {selectedVoice.category}
                    </div>
                  </div>
                  
                  <h1 className="heading_h1" style={{ color: '#675032' }}>
                    {selectedVoice.title}
                  </h1>
                  
                  <div className="flex_horizontal is-y-center gap-medium" style={{ marginTop: '20px' }}>
                    <div className="avatar is-large">
                      <img 
                        alt={selectedVoice.name} 
                        src={selectedVoice.image} 
                        loading="lazy" 
                        className="image_cover"
                      />
                    </div>
                    <div>
                      <div className="heading_h4 margin-bottom_none" style={{ color: '#675032' }}>
                        {selectedVoice.name}
                      </div>
                      <div className="paragraph margin-bottom_none" style={{ color: '#675032' }}>
                        {selectedVoice.workplace} • {selectedVoice.experience} • {selectedVoice.age}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </header>

            {/* Voice Content */}
            <section className="section">
              <div className="container">
                <article 
                  className="rich-text"
                  style={{ 
                    maxWidth: '800px', 
                    margin: '0 auto',
                    lineHeight: '1.8',
                    fontSize: '16px'
                  }}
                  dangerouslySetInnerHTML={{ __html: selectedVoice.content }}
                />
                
                {/* Tags */}
                <div style={{ maxWidth: '800px', margin: '40px auto 0' }}>
                  <h3 className="heading_h4" style={{ color: '#675032', marginBottom: '16px' }}>
                    関連キーワード
                  </h3>
                  <div className="tag_group">
                    {selectedVoice.tags.map((tag, index) => (
                      <span 
                        key={index}
                        className="tag"
                        style={{ 
                          backgroundColor: '#f8f2e8',
                          color: '#675032'
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Related Voices */}
            <section className="section is-secondary">
              <div className="container">
                <div className="header is-align-center">
                  <h2 className="heading_h2" style={{ color: '#675032' }}>他の先輩の声</h2>
                </div>
                <div className="grid_3-col gap-large">
                  {voices.filter(voice => voice.id !== selectedVoice.id).slice(0, 3).map((voice) => (
                    <motion.article 
                      key={voice.id}
                      className="link-content-block"
                      onClick={() => handleVoiceSelect(voice)}
                      style={{ cursor: 'pointer' }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="card">
                        <div className="ratio_3x2 margin-bottom_small">
                          <img 
                            alt={voice.name} 
                            src={voice.image} 
                            loading="lazy" 
                            className="image_cover"
                          />
                        </div>
                        <div className="tag_group margin-bottom_small">
                          <div className="tag" style={{ 
                            backgroundColor: getProfessionColor(voice.profession), 
                            color: '#675032' 
                          }}>
                            {voice.profession}
                          </div>
                        </div>
                        <h3 className="heading_h4" style={{ color: '#675032' }}>
                          {voice.title}
                        </h3>
                        <p className="paragraph" style={{ color: '#675032' }}>
                          {voice.excerpt}
                        </p>
                      </div>
                    </motion.article>
                  ))}
                </div>
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="section is-secondary">
        <div className="container">
          <div className="flex_horizontal is-y-center">
            <div className="paragraph_small text-color_secondary">
              © 2021 MediMatch. All rights reserved.
            </div>
            <button 
              onClick={(e) => {
                e.preventDefault();
                if (typeof onReturnHome === 'function') {
                  onReturnHome();
                }
              }}
              className="text-link is-small"
              style={{ marginLeft: 'auto' }}
            >
              ホームに戻る
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default VoicesPage;