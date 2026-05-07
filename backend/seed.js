const pool = require("./db");

async function seedData() {
  try {
    console.log("🌱 Seeding sample data...");

    // Sample topics
    const topics = [
      {
        title: "Chào mừng đến với diễn đàn NCKH",
        content:
          "Nơi trao đổi về nghiên cứu khoa học sinh viên. Hãy chia sẻ ý tưởng và kinh nghiệm của bạn!",
      },
      {
        title: "Hướng dẫn viết báo cáo NCKH",
        content:
          "Bài viết chia sẻ kinh nghiệm viết báo cáo nghiên cứu khoa học cho sinh viên.",
      },
      {
        title: "Khó khăn khi tìm đề tài nghiên cứu",
        content:
          "Tôi đang gặp khó khăn trong việc chọn đề tài phù hợp. Ai có kinh nghiệm chia sẻ giúp với?",
      },
    ];

    for (const topic of topics) {
      await pool.query(
        "INSERT INTO posts (title, content, votes) VALUES ($1, $2, $3)",
        [topic.title, topic.content, Math.floor(Math.random() * 10)],
      );
    }

    // Get topic IDs
    const result = await pool.query("SELECT id FROM posts ORDER BY id");
    const topicIds = result.rows.map((row) => row.id);

    // Sample comments
    const comments = [
      {
        topic_id: topicIds[0],
        content: "Rất vui khi được tham gia diễn đàn này!",
      },
      {
        topic_id: topicIds[0],
        content: "Hy vọng mọi người sẽ hỗ trợ nhau nhiều hơn.",
      },
      { topic_id: topicIds[1], content: "Cảm ơn bài viết hữu ích!" },
      { topic_id: topicIds[1], content: "Tôi cũng đang cần hướng dẫn này." },
      { topic_id: topicIds[2], content: "Tôi cũng gặp vấn đề tương tự." },
      {
        topic_id: topicIds[2],
        content: "Hãy thử tìm hiểu từ các bài nghiên cứu có sẵn.",
      },
    ];

    for (const comment of comments) {
      await pool.query(
        "INSERT INTO comments (topic_id, content) VALUES ($1, $2)",
        [comment.topic_id, comment.content],
      );
    }

    console.log("✅ Sample data seeded successfully!");
    console.log(
      `📊 Created ${topics.length} topics and ${comments.length} comments`,
    );
  } catch (err) {
    console.error("❌ Seeding error:", err.message);
  } finally {
    await pool.end();
  }
}

seedData();
