<?php
namespace Vancado\GwPreisrechnertheme\Tests\Unit\Domain\Model;

/**
 * Test case.
 */
class ThemeTest extends \TYPO3\CMS\Core\Tests\UnitTestCase
{
    /**
     * @var \Vancado\GwPreisrechnertheme\Domain\Model\Theme
     */
    protected $subject = null;

    protected function setUp()
    {
        parent::setUp();
        $this->subject = new \Vancado\GwPreisrechnertheme\Domain\Model\Theme();
    }

    protected function tearDown()
    {
        parent::tearDown();
    }

    /**
     * @test
     */
    public function dummyTestToNotLeaveThisFileEmpty()
    {
        self::markTestIncomplete();
    }
}
